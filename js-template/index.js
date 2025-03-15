module.exports = function(RED) {
    function JsTemplate(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.name = config.name;
        node.template = config.template;
        node.property = config.property || "payload";
        node.on("input", function(msg) {
            result = node.template.replace(/{{(.*?)}}/g, function(_match, p1) {
                with (msg) {
                    return eval(p1);
                }
            });
            msg[node.property] = result;
            node.send(msg);
        });
    }
	
    RED.nodes.registerType("JS Template", JsTemplate);
}
