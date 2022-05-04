import { prisma } from '../../../lib/prisma';

module.exports = {
    Query: {
        powershiftReading: async (root, args, context) => await prisma.powerShiftReading.findMany({
            where: {
                deleted: false,
                inspection: {
                    monitoring_id: args.monitoring_id
                }
            },
            include: {
                inspection: true
            }
        }),
        powershiftDisplay: async (root, args, context) => await prisma.powerShiftReading.findMany({
            include: {
                inspection: true
            }
        })

    },
    Mutation: {
        upsertPowerShift: async (root, args, context) => {
            let item = {}

            if (args.id) {
                item = await prisma.powerShiftReading.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        inspection_id: args.inspection_id,
                        mode: args.mode,
                        line_curr_1: args.line_curr_1,
                        line_curr_2: args.line_curr_2,
                        line_curr_3: args.line_curr_3,
                        line_volt_1: args.line_volt_1,
                        line_volt_2: args.line_volt_2,
                        line_volt_3: args.line_volt_3,
                        duration_start: args.duration_start,
                        duration_end: args.duration_end,
                        shift_order: args.shift_order,
                        power_type: args.power_type,
                        frequency: args.frequency
                    }
                })
            } else {
                item = await prisma.powerShiftReading.create({
                    data: {
                        inspection_id: args.inspection_id,
                        mode: args.mode,
                        line_curr_1: args.line_curr_1,
                        line_curr_2: args.line_curr_2,
                        line_curr_3: args.line_curr_3,
                        line_volt_1: args.line_volt_1,
                        line_volt_2: args.line_volt_2,
                        line_volt_3: args.line_volt_3,
                        duration_start: args.duration_start,
                        duration_end: args.duration_end,
                        shift_order: args.shift_order,
                        power_type: args.power_type,
                        frequency: args.frequency
                    },
                })
            }
            return item;
        },
        deletePowerShift: async(root, args, context) => {
            const item = await prisma.powerShiftReading.update({
                where: {
                    id: args.id
                },
                data: {
                    deleted: true
                }
            })
        }
    }
}