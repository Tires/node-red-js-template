# Node-RED JS Template Node

This project provides a custom Node-RED node called **JS Template**, which allows users to dynamically generate message properties using JavaScript template strings.

## Features

- Replace placeholders in a template string with evaluated JavaScript expressions.
- Configure the output property where the result will be stored (default: `payload`).

## Installation

To install this node into your Node-RED environment, navigate to your Node-RED user directory (usually `~/.node-red`) and run:

```bash
npm install <path-to-this-repository>
```

Restart Node-RED after installation.

## Docker

```bash
cd /data
npm install https://github.com/Tires/node-red-js-template.git
```

Restart Node-RED after installation.

## Usage

1. Drag the **JS Template** node into your Node-RED flow.
2. Configure the node:
   - **Name**: A custom name for the node.
   - **Template**: The JavaScript template string containing placeholders (e.g., `Hello, {{name}}!`).
   - **Property**: The message property where the result will be stored (default: `payload`).
3. Connect the node to other nodes in your flow.
4. Inject a message with the required properties, and the node will replace placeholders with evaluated values.

### Template Types

1. **Text Template**: A simple string template where placeholders (e.g., `{{property}}`) are replaced with evaluated JavaScript expressions from the input message.
2. **JSON Template**: Similar to Text Template, but the result is parsed as JSON. Use this type when the output needs to be a valid JSON object or array.
3. **JavaScript**: Allows writing full JavaScript code to generate the output. The code is evaluated in the context of the input message.

**Note**: Environment variables from the flow can be accessed using `$env`. For example, `$env.myVar` will retrieve the value of the environment variable `myVar`.

### Example

If the template is `Hello, {{name}}!` and the input message is:

```json
{
  "name": "Alice"
}
```

The output message will be:

```json
{
  "payload": "Hello, Alice!"
}
```

## Security Warning

This node uses `eval()` to evaluate JavaScript expressions. Be cautious when using this node with untrusted input, as it may introduce security vulnerabilities.

## License

This project is licensed under the ISC-License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Support

For questions or issues, please open an issue in this repository.