import * as cdk from '@aws-cdk/core';
import * as pipelines from '@aws-cdk/pipelines';
import { MyStage } from './mystage';

export class ProjStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const connection = pipelines.CodePipelineSource.connection(
      'shogondo/case2314623343-cdkv1',
      'main',
      {
        connectionArn: 'arn:aws:codestar-connections:ap-northeast-1:393007915094:connection/a480f9e0-2bdb-4bad-8428-86ff691d0af9'
      }
    )

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: 'CdkPipeline',
      crossAccountKeys: true,
      synth: new pipelines.CodeBuildStep('SynthStep', {
        input: connection,
        installCommands: [
          'npm install -g aws-cdk'
        ],
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth --debug --verbose --trace'
        ]
      })
    });

    const stage = new MyStage(this, 'MyStage', {});
    pipeline.addStage(stage)

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ProjQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
