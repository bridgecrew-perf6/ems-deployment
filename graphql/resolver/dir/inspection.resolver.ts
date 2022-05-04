import { prisma } from "../../../lib/prisma";


module.exports = {
    Query: {
        inspection_power: async (root, args, context) => await prisma.inspection.findMany({
            where: {
                deleted: false,
                classification: "Power",
                monitoring_id: args.monitoring_id
            },
            include: {
                user: true,
                daily_monitoring: true
            }
        }),
        inspection_pump: async (root, args, context) => await prisma.inspection.findMany({
            where: {
                deleted: false,
                classification: "Pump",
                monitoring_id: args.monitoring_id
            },
            include: {
                user: true,
                daily_monitoring: true
            }
        }),
        inspection_fire: async (root, args, context) => await prisma.inspection.findMany({
            where: {
                deleted: false,
                classification: "Fire",
                monitoring_id: args.monitoring_id
            },
            include: {
                user: true,
                daily_monitoring: true
            }
        }),
        inspection_waste: async (root, args, context) => await prisma.inspection.findMany({
            where: {
                deleted: false,
                classification: "Waste",
                monitoring_id: args.monitoring_id
            },
            include: {
                user: true,
                daily_monitoring: true
            }
        }),
       
    },
    Mutation: {
        upsertInspection: async (root, args, context) => {
            let returner = {};

            if (args.id) {
                returner = await prisma.inspection.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        id: args.id,
                        time_inspected: args.time_inspected,
                        remarks: args.remarks, 
                        monitoring_id: args.monitoring_id, 
                        inspection_incharge: args.inspection_incharge,
                        classification: args.classification
                    }
                })
            } else {
                returner = await prisma.inspection.create({
                    data: {
                        time_inspected: args.time_inspected,
                        remarks: args.remarks, 
                        monitoring_id: args.monitoring_id, 
                        inspection_incharge: args.inspection_incharge,
                        classification: args.classification
                    }
                });
            }

            return returner;
        },
        deleteInspection: async (root, args, context) => {

            const returner = await prisma.inspection.update({
                where: {
                    id: args.id
                },
                data: {
                    deleted: true
                }
            })

            return returner;
        }
    }
};

