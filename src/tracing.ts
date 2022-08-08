import { Resource } from '@opentelemetry/resources';
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import httpTraceExporter = require('@opentelemetry/exporter-trace-otlp-http');
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import * as env from 'env-var';

const url = env.get('OTEL_HTTP_ENDPOINT').asString()?.trim();

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new GraphQLInstrumentation(),
  ],
});

const provider = new NodeTracerProvider({
  resource: Resource.default().merge(
    new Resource({
      'service.name': 'subgraph-a',
    })
  ),
});

let traceExporter = null;

if (!url) {
  console.log('no exporting url found - using console span exporter');
  traceExporter = new ConsoleSpanExporter();
} else {
  console.log(`Exporting otel traces to ${url}`);
  traceExporter = new httpTraceExporter.OTLPTraceExporter({
    url,
  });
}

provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
provider.register();
