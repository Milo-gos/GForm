import { ZodEffects, ZodNumber, ZodString, z } from 'zod';

// Hàm sinh ra schema cho string
export const createTextSchema = (conditions: any) => {
    let schema: ZodString | ZodEffects<ZodString, string, string> = z.string();

    if (conditions.isRequired) {
        schema = schema.min(1, {
            message: 'Câu hỏi này là bắt buộc',
        });
    }

    if (conditions.email) {
        schema = schema.email(conditions.errorMessage);
    }

    if (conditions.url) {
        schema = schema.url(conditions.errorMessage);
    }

    if (conditions.contains) {
        schema = schema.refine((val) => val.includes(conditions.contains), {
            message: conditions.errorMessage,
        });
    } else if (conditions.notContains) {
        schema = schema.refine((val) => !val.includes(conditions.contains), {
            message: conditions.errorMessage,
        });
    }

    return schema;
};

export const createLengthSchema = (conditions: any) => {
    let schema = z.string();

    if (conditions.isRequired) {
        schema = schema.min(1, {
            message: 'Câu hỏi này là bắt buộc',
        });
    }

    if (conditions.minLength !== undefined) {
        schema = schema.min(conditions.minLength, {
            message: conditions.errorMessage,
        });
    }

    if (conditions.maxLength !== undefined) {
        schema = schema.max(conditions.maxLength, {
            message: conditions.errorMessage,
        });
    }

    return schema;
};

// Hàm sinh ra schema cho number
export const createNumberSchema = (conditions: any) => {
    let schema: ZodNumber | ZodEffects<ZodNumber, number, number> = z.number({
        required_error: 'Câu hỏi này là bắt buộc',
        invalid_type_error: conditions.errorMessage,
    });

    if (conditions.greaterThan !== undefined) {
        schema = schema.gt(conditions.greaterThan, {
            message: conditions.errorMessage,
        });
    }

    if (conditions.greaterThanOrEqual !== undefined) {
        schema = schema.gte(conditions.greaterThan, {
            message: conditions.errorMessage,
        });
    }

    if (conditions.lessThan !== undefined) {
        schema = schema.lt(conditions.lessThan, {
            message: conditions.errorMessage,
        });
    }

    if (conditions.lessThanOrEqual !== undefined) {
        schema = schema.lte(conditions.lessThanOrEqual, {
            message: conditions.errorMessage,
        });
    }

    if (conditions.between !== undefined) {
        schema = schema.refine((val) => val >= conditions.between[0] && val <= conditions.between[1], {
            message: conditions.errorMessage,
        });
    } else {
        if (conditions.notBetween !== undefined) {
            schema = schema.refine((val) => val < conditions.notBetween[0] || val > conditions.notBetween[1], {
                message: conditions.errorMessage,
            });
        }
    }

    return schema;
};

// Hàm tạo schema tùy thuộc vào kiểu dữ liệu
export const createSchema = (type: string, conditions: any) => {
    switch (type) {
        case 'text':
            return createTextSchema(conditions);
        case 'number':
            return createNumberSchema(conditions);
        case 'length':
            return createLengthSchema(conditions);
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};
