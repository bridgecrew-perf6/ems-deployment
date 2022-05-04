import { argsToArgsConfig } from "graphql/type/definition";
import { prisma } from "../../../lib/prisma";

module.exports = {
    Query: {
        generator_status: async (root, args, context) => await prisma.generatorStatus.findMany({
            where: {
                deleted: false,
                inspection: {
                    monitoring_id: args.monitoring_id
                },
                generator: {
                    deleted: false
                }
            },
            include: {
                inspection: true,
                generator: true,
            }
        }),
    },
    Mutation: {
        upsertGeneratorStatus: async (root, args, context) => {
            let item = {};

            if (args.id) {
                item = await prisma.generatorStatus.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        generator_id: args.generator_id,
                        inspection_id: args.inspection_id,
                        bat_voltage: args.bat_voltage,
                        syncro_stat: args.syncro_stat, 
                        coolant: args.coolant,
                        fuel_level: args.fuel_level,
                        engine_oil: args.engine_oil
                    }
                });
            } else {
                item = await prisma.generatorStatus.create({
                    data: {
                        generator_id: args.generator_id,
                        inspection_id: args.inspection_id,
                        bat_voltage: args.bat_voltage,
                        syncro_stat: args.syncro_stat, 
                        coolant: args.coolant,
                        fuel_level: args.fuel_level,
                        engine_oil: args.engine_oil
                    }
                });

                return item;
            }
        },
        deleteGeneratorStatus: async (root,args,context) => {
            const item = await prisma.generatorStatus.update({
                where: {
                    id: args.id
                },
                data: {
                    deleted: true
                }
            })
            return item;
        }
    }
}