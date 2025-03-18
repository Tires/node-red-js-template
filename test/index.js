module.exports = function (RED) {
    function TestNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.name = config.name;
        node.on("input", function(msg) {
            let nodes = node.wires.flatMap(wires => wires.map(id => RED.nodes.getNode(id)));
            const msgs = Array.from({ length: node.outputs }, (_, i) => ({
                ...msg,
                payload: `Hello ${i + 1}`
            }));
            node.send(msgs);
        });
    }

    RED.nodes.registerType("Test Node", TestNode);
}
