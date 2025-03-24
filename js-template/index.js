const moment = require("moment");

module.exports = function(RED) {
    function to_function(code) {
        const func = new Function("args", "with(args) { return " + code + "; }");
        return function(args) {
            try {
                return func(args);
            } catch (e) {
                node.error("Error evaluating JS: " + e.message);
                throw new Error("Error evaluating JS: " + e.message);
            }
        };
    }

    function JsTemplate(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.name = config.name;
        node.entries = config.entries || [{
            property: "payload",
            template: "",
            type: "text"
        }];
        node.on("input", function(msg) {
            node.entries.forEach(entry => {
                args = {
                    ...msg,
                    $env: node._flow._env,
                    $now: moment()
                };
                let result;
                if (entry.type === "JS") {
                    result = to_function(entry.template)(args);
                } else {
                    result = entry.template.replace(/{{(.*?)}}/g, function(_match, p1) {
                        return to_function(p1)(args);
                    });
                    if (entry.type === "JSON") {
                        try {
                            result = JSON.parse(result);
                        }
                        catch (e) {
                            node.error("Error parsing JSON: " + e.message);
                            return;
                        }
                    }
                }
                msg[entry.property] = result;
            });
            node.send(msg);
        });
    }
	
    RED.nodes.registerType("JS Template", JsTemplate);
}
