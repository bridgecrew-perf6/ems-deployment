import { prisma } from "../../../lib/prisma";

module.exports = {
    Query: {
        firePressures: async(root,args,context) => await prisma.firePressures.findMany({
            where: {
                deleted: false,
                inspection: {
                    monitoring_id: args.monitoring_id
                },
                floor: {
                    deleted: false
                }
            },
            include: {
                inspection: true,
                floor: true
            }
        })
    },
    Mutation: {
        upsertFirePressure: async(root,args,context) => {
            let item = {}

            if (args.id) {
                item = await prisma.firePressures.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        floor_id: args.floor_id,
                        pressure: args.pressure,
                        inspection_id: args.inspection_id,
                    }
                })
            } else {
                item = await prisma.firePressures.create({
                    data: {
                        floor_id: args.floor_id,
                        pressure: args.pressure,
                        inspection_id: args.inspection_id,
                    }
                })
            }

            return item;
        },
        deleteFirePressure: async (root,args,context) => {
            const item = await prisma.firePressures.update({
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