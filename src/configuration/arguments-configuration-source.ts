import { parse, ArgumentConfig } from "ts-command-line-args";
import { PartialConfiguration } from "./configuration.js";
import * as _ from "lodash-es";
import { ModProviderName } from "../mod-providers/mod-provider.js";

interface Arguments {
    "modpack-id"?: number,
    "modpack-version"?: number,
    "yes"?: boolean,
    "help"?: boolean
}

function int(value?: string): number | undefined {
    if (!value) return undefined;

    const number = parseInt(value, 10);
    return typeof(number) == "number" && !isNaN(number) ? number : undefined;
}

function getArguments(): string[] {
    if (process.argv.length < 2) return [];

    let argv = process.argv.slice(2);
    while (argv[0] && !argv[0].startsWith('-')) {
        argv = argv.slice(1);
    }

    return argv;
}

export function getArgumentConfiguration(provider: ModProviderName): Promise<PartialConfiguration> {
    let argumentConfig: Partial<ArgumentConfig<Arguments>> = {
        help: { type: Boolean, optional: true, alias: 'h', description: "Prints this usage guide" },
        yes: { type: Boolean, optional: true, alias: 'y', description: "Automatically answer all confirmation prompts with 'yes'"}
    };

    if (provider == "modpacks.ch") {
        _.defaults(argumentConfig, {
            "modpack-id": { type: int, optional: true, description: "The modpack id of the modpacks.ch modpack to download" },
            "modpack-version": { type: int, optional: true, description: "The modpack version of the modpacks.ch modpack to download" }
        })
    }

    const args = parse<Arguments>(
        argumentConfig as ArgumentConfig<Arguments>,
        {
            argv: getArguments(),
            processExitCode: 1,
            helpArg: "help"
        }
    );

    const bindings = {
        "modpack-id": { "modpacks.ch": { modpack: { id: args["modpack-id"] } } },
        "modpack-version": { "modpacks.ch": { modpack: { version: args["modpack-version"] } } },
        "yes": { confirmAll: args["yes"] }
    };

    let config: PartialConfiguration = {};
    for (const [name, binding] of Object.entries(bindings)) {
        if (args[name] != undefined) {
            _.defaultsDeep(config, binding);
        }
    }

    return Promise.resolve(config);
}
