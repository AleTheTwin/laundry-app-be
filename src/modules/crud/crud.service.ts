/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { LoggerService } from '../logger/logger.service.js';

export enum ModelName {
    USER = 'USER',
    CARE_INSTRUCTION = 'CARE_INSTRUCTION',
    CLOTH_CARE_INSTRUCTION = 'CLOTH_CARE_INSTRUCTION',
    CLOTH = 'CLOTH',
    CLOSET = 'CLOSET',
    WASHING_MACHINE = 'WASHING_MACHINE',
    WASHING_INSTRUCTIONS = 'WASHING_INSTRUCTIONS',
    LAUNDRY_BATCH = 'LAUNDRY_BATCH',
}

type ModelMap = {
    [ModelName.USER]: PrismaService['user'];

    [ModelName.CARE_INSTRUCTION]: PrismaService['careInstruction'];

    [ModelName.CLOTH_CARE_INSTRUCTION]: PrismaService['clothCareInstruction'];

    [ModelName.CLOTH]: PrismaService['cloth'];

    [ModelName.CLOSET]: PrismaService['closet'];

    [ModelName.WASHING_MACHINE]: PrismaService['washingMachine'];

    [ModelName.WASHING_INSTRUCTIONS]: PrismaService['washingInstruccions'];

    [ModelName.LAUNDRY_BATCH]: PrismaService['laundryBatch'];
};

@Injectable()
export class CrudService {
    private readonly models: ModelMap;

    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: LoggerService,
    ) {
        this.models = {
            [ModelName.USER]: this.prisma.user,

            [ModelName.CARE_INSTRUCTION]: this.prisma.careInstruction,

            [ModelName.CLOTH_CARE_INSTRUCTION]:
                this.prisma.clothCareInstruction,

            [ModelName.CLOTH]: this.prisma.cloth,

            [ModelName.CLOSET]: this.prisma.closet,

            [ModelName.WASHING_MACHINE]: this.prisma.washingMachine,

            [ModelName.WASHING_INSTRUCTIONS]: this.prisma.washingInstruccions,

            [ModelName.LAUNDRY_BATCH]: this.prisma.laundryBatch,
        };
    }

    private getModel<T extends ModelName>(model: T): ModelMap[T] {
        const selectedModel = this.models[model];

        if (!selectedModel) {
            this.logger.error(
                `Model ${model} not supported`,
                '',
                'CrudService',
            );
            throw new Error(`Model ${model} not supported`);
        }

        return selectedModel;
    }

    async findAll<T extends ModelName>(
        model: T,
        args?: Parameters<ModelMap[T]['findMany']>[0],
    ): Promise<ReturnType<ModelMap[T]['findMany']>> {
        try {
            this.logger.log(
                `Finding all records for model: ${model}`,
                'CrudService',
            );
            // @ts-expect-error error por generico
            const result = await this.getModel(model).findMany(args);
            this.logger.log(
                `Found ${Array.isArray(result) ? result.length : 0} records for model: ${model}`,
                'CrudService',
            );
            return result;
        } catch (error) {
            this.logger.error(
                `Error finding all records for model: ${model}`,
                error.stack,
                'CrudService',
            );
            throw error;
        }
    }

    async findOne<T extends ModelName>(
        model: T,
        args: Parameters<ModelMap[T]['findUnique']>[0],
    ): Promise<ReturnType<ModelMap[T]['findUnique']>> {
        try {
            this.logger.log(
                `Finding one record for model: ${model} with args: ${JSON.stringify(args)}`,
                'CrudService',
            );
            // @ts-expect-error error por generico
            const result = await this.getModel(model).findUnique(args);
            this.logger.log(
                `Found record for model: ${model}: ${result ? 'success' : 'not found'}`,
                'CrudService',
            );
            return result;
        } catch (error) {
            this.logger.error(
                `Error finding one record for model: ${model}`,
                error.stack,
                'CrudService',
            );
            throw error;
        }
    }

    async create<T extends ModelName>(
        model: T,
        args: Parameters<ModelMap[T]['create']>[0],
    ): Promise<ReturnType<ModelMap[T]['create']>> {
        try {
            this.logger.log(
                `Creating new record for model: ${model}`,
                'CrudService',
            );
            // @ts-expect-error error por generico
            const result = await this.getModel(model).create(args);
            this.logger.log(
                `Successfully created record for model: ${model} with ID: ${JSON.stringify(result).substring(0, 100)}...`,
                'CrudService',
            );
            return result;
        } catch (error) {
            this.logger.error(
                `Error creating record for model: ${model}`,
                error.stack,
                'CrudService',
            );
            throw error;
        }
    }

    async update<T extends ModelName>(
        model: T,
        args: Parameters<ModelMap[T]['update']>[0],
    ): Promise<ReturnType<ModelMap[T]['update']>> {
        try {
            this.logger.log(
                `Updating record for model: ${model}`,
                'CrudService',
            );
            // @ts-expect-error error por generico
            const result = await this.getModel(model).update(args);
            this.logger.log(
                `Successfully updated record for model: ${model}`,
                'CrudService',
            );
            return result;
        } catch (error) {
            this.logger.error(
                `Error updating record for model: ${model}`,
                error.stack,
                'CrudService',
            );
            throw error;
        }
    }

    async delete<T extends ModelName>(
        model: T,
        args: Parameters<ModelMap[T]['delete']>[0],
    ): Promise<ReturnType<ModelMap[T]['delete']>> {
        try {
            this.logger.log(
                `Deleting record for model: ${model}`,
                'CrudService',
            );
            // @ts-expect-error error por generico
            const result = await this.getModel(model).delete(args);
            this.logger.log(
                `Successfully deleted record for model: ${model}`,
                'CrudService',
            );
            return result;
        } catch (error) {
            this.logger.error(
                `Error deleting record for model: ${model}`,
                error.stack,
                'CrudService',
            );
            throw error;
        }
    }

    async count<T extends ModelName>(
        model: T,
        args?: Parameters<ModelMap[T]['count']>[0],
    ): Promise<ReturnType<ModelMap[T]['count']>> {
        try {
            this.logger.log(
                `Counting records for model: ${model}`,
                'CrudService',
            );
            // @ts-expect-error error por generico
            const result = await this.getModel(model).count(args);
            this.logger.log(
                `Counted ${result} records for model: ${model}`,
                'CrudService',
            );
            return result;
        } catch (error) {
            this.logger.error(
                `Error counting records for model: ${model}`,
                error.stack,
                'CrudService',
            );
            throw error;
        }
    }
}
