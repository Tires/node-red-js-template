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
                result = entry.template.replace(/{{(.*?)}}/g, function(_match, p1) {
                    with (msg) {
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
                msg[entry.property] = result;
            });
            node.send(msg);
        });
    }
	
    RED.nodes.registerType("JS Template", JsTemplate);
}
