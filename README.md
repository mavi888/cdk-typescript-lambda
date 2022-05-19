# Build your Lambda with Typescript using AWS CDK

_Infrastructure as code framework used_: AWS CDK
_AWS Services used_: AWS Lambda, AWS DynamoDB

## Summary of the demo

In this demo you will see:

- How to use Typescript in your Lambda functions and how to deploy it easily using AWS CDK

This demo is part of a video posted in FooBar Serverless channel. You can check the video to see the whole demo.

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the AWS Pricing page for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

## Requirements

- AWS CLI already configured with Administrator permission
- AWS CDK - v2
- NodeJS 14.x installed
- CDK bootstrapped in your account

## Deploy this demo

Deploy the project to the cloud:

```
cdk synth
cdk deploy
```

When asked about functions that may not have authorization defined, answer (y)es. The access to those functions will be open to anyone, so keep the app deployed only for the time you need this demo running.

To delete the app:

```
cdk destroy
```

## Links related to this code

- Video with more details: https://youtu.be/CeqwpYhlHbQ

### AWS CDK useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
