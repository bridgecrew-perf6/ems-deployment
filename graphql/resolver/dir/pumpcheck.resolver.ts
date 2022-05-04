
import { prisma } from '../../../lib/prisma';

module.exports = {
    Query: {
        pumpCheckDisplay: async (root, args, context) => await prisma.pumpCheck.findMany({
            where: {
                deleted: false,
                inspection: {
                    monitoring_id: args.monitoring_id
                },
                pump: {
                    deleted: false
                }
            },
            include: {
                pump: true,
                inspection: true
            }
        })
    },
    Mutation: {
        upsertPumpCheck: async (root, args, context) => {
            let item = {}

            if (args.id) {
                item = await prisma.pumpCheck.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        inspection_id: args.inspection_id,
                        pump_id: args.pump_id,
                        pump_mode: args.pump_mode,
                        pump_pressure: args.pump_pressure
                    }
                })
            } else {
                item = await prisma.pumpCheck.create({
                    data: {
                        inspection_id: args.inspection_id,
                        pump_id: args.pump_id,
                        pump_mode: args.pump_mode,
                        pump_pressure: args.pump_pressure
                    }
                })
            }
            return item
        },
        deletePumpCheck: async (root, args, context) => {
            const item = await prisma.pumpCheck.update({
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