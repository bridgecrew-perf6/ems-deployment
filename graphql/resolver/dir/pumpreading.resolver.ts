import { makeUniqueId } from '@apollo/client/utilities';
import { prisma } from '../../../lib/prisma';

module.exports = {
    Query: {
        pumpReading: async (root, args, context) => await prisma.pumpReading.findMany({
            where: {
                deleted: false,
                inspection: {
                    monitoring_id: args.monitoring_id
                }
            },
            include: {
                inspection: true,
            }
        })
    },
    Mutation: {
        upsertPumpReading: async (root, args, context) => {
            let item = {};

            if (args.id) {
                item = await prisma.pumpReading.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        inspection_id: args.inspection_id,
                        pump_room_read: args.pump_room_read,
                        pump_station_read: args.pump_station_read,
                        stp_discharge_read: args.stp_discharge_read,
                        stp_recycled_read: args.stp_recycled_read,
                        main_kwhr_read: args.main_kwhr_read,
                        stp_kwhr_read: args.stp_discharge_read
                    }
                })
            } else {
                item = await prisma.pumpReading.create({
                    data: {
                        inspection_id: args.inspection_id,
                        pump_room_read: args.pump_room_read,
                        pump_station_read: args.pump_station_read,
                        stp_discharge_read: args.stp_discharge_read,
                        stp_recycled_read: args.stp_recycled_read,
                        main_kwhr_read: args.main_kwhr_read,
                        stp_kwhr_read: args.stp_discharge_read
                    }
                })
            }
        },
        deletePumpReading: async (root, args, context) => {
            const item = await prisma.pumpReading.update({
                where: {
                    id: args.id
                },
                data: {
                    deleted: true
                }
            })
            return item
        }
    }
}