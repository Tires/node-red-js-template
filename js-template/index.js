const moment = require("moment");

module.exports = function(RED) {
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
                    try {
                        with (args) {
                            result = eval(entry.template);
                        }
                    } catch (e) {
                        node.error("Error evaluating JS: " + e.message);
                    }
                } else {
                    try {
                        result = entry.template.replace(/{{(.*?)}}/g, function(_match, p1) {
                            with (args) {
                                return eval(p1);
                            }
                        });
                        if (entry.type === "JSON")
                            try {
                                result = JSON.parse(result);
                            }
                            catch (e) {
                                node.error("Error parsing JSON: " + e.message);
                            }
                    } catch (e) {
                        node.error("Error evaluating JS: " + e.message);
                    }
                }
                msg[entry.property] = result;
            });
            node.send(msg);
        });
    }
	
    RED.nodes.registerType("JS Template", JsTemplate);
}
