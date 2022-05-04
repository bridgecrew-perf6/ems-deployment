import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

module.exports = 
    {
        Query: {
            // pump: async () => await prisma.pump.findMany(),
            pump: async () => await prisma.pump.findMany({
                where: {
                    deleted: false
                }
            }),
        },
        Mutation: {
            upsertPump: async (root, args, context) => {
                let item = {}

                if(args.id){
                    item =  await prisma.pump.update({
                        where:{
                            id: args.id
                        },
                        data: {
                            name: args.name,
                            description: args.description
                        },
                      });
                }else{
                    item =  await prisma.pump.create({
                        data: {
                            name: args.name,
                            description: args.description
                        },
                      });
                }

                  return item;
            },
            deletePump: async (root, args, context) => {
              const item =  await prisma.pump.update({
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
    };

