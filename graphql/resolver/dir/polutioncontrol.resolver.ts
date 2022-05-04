import { prisma } from "../../../lib/prisma";

// module.exports =
// {
//     Query: {
//         polutionControl: async () => await prisma.polutionControl.findMany(),
//     },
//     Mutation: {
//         upsertPolutionControl: async (root, args, context) => {
//             let item = {}

//             if (args.id) {
//                 item = await prisma.polutionControl.update({
//                     where: {
//                         id: args.id
//                     },
//                     data: {
//                         waste_id: args.waste_id,
//                         inspection_id: args.inspection_id,
//                         unit_id: args.unit_id,
//                         quantity: args.quantity
//                     },
//                 });
//             } else {
//                 item = await prisma.polutionControl.create({
//                     data: {
//                         waste_id: args.waste_id,
//                         inspection_id: args.inspection_id,
//                         unit_id: args.unit_id,
//                         quantity: args.quantity
//                     },
//                 });
//             }

//             return item;
//         },
//         deletePolutionControl: async (root, args, context) => {
//             const item = await prisma.polutionControl.delete({
//                 where: {
//                     id: args.id
//                 }
//             })

//             return item;
//         }
//     }
// };

module.exports =
{
    Query: {
        polutionControl: async (root, args, context) => await prisma.polutionControl.findMany({
            where: {
                deleted: false
            }
        }),
        polutionInspection: async (root, args, context) => await prisma.polutionControl.findMany({
            where: {
                deleted: false,
                inspection: {
                    monitoring_id: args.monitoring_id,
                },
                waste: {
                    deleted: false
                },
                unit: {
                    deleted: false
                }
            },
            include: {
                inspection: true,
                waste: true,
                unit: true
            }
        })
    },
    Mutation: {
        upsertPolutionControl: async (root, args, context) => {
            let item = {}

            if (args.id) {
                item = await prisma.polutionControl.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        unit_id: args.unit.id,
                        waste_id: args.waste_id,
                        quantity: args.quantity,
                        inspection_id: args.inspection_id,
                    }
                })

            } else {
                item = await prisma.polutionControl.create({
                    data: {
                        unit_id: args.unit.id,
                        waste_id: args.waste_id,
                        quantity: args.quantity,
                        inspection_id: args.inspection_id,
                    }
                })

            }
            return item;

        },
        deletePolutionControl: async (root, args, context) => {
            const item = await prisma.polutionControl.update({
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
