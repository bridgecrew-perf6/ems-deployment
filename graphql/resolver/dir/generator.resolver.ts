import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

module.exports = 
    {
        Query: {
            // generators: async () => await prisma.generator.findMany(),
            generators: async () => await prisma.generator.findMany({
                where :{
                   deleted: false
                }
            }),
        },
        Mutation: {
            upsertGenerator: async (root, args, context) => {
                let item = {}

                if(args.id){
                    item =  await prisma.generator.update({
                        where:{
                            id: args.id
                        },
                        data: {
                            name: args.name,
                            description: args.description
                        },
                      });
                }else{
                    item =  await prisma.generator.create({
                        data: {
                            name: args.name,
                            description: args.description
                        },
                      });
                }

                  return item;
            },
            deleteGenerator: async (root, args, context) => {
              const item =  await prisma.generator.update({
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

