import { Construct, Stack, StackProps } from "@aws-cdk/core";
import * as ec2 from '@aws-cdk/aws-ec2';

export class NetworkStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
      super(scope, id, props);

      const vpc = new ec2.Vpc(this, "vpc", {
        cidr: '172.1.1.0/24',
        natGateways: 1,
        natGatewaySubnets: {subnetGroupName: 'public'},
        subnetConfiguration: [
          {
            name: 'public',
            subnetType: ec2.SubnetType.PUBLIC,
          },
          {
            name: 'private',
            subnetType: ec2.SubnetType.PRIVATE_WITH_NAT
          },
          {
            name: 'protected',
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED
          }
        ]
      });  
    }
}
