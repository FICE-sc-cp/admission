import {Role} from "@prisma/client";
import {ContractDto} from "$/admission-api/src/api/documents/dto/contract.dto";
import {EntrantDataDto} from "$/admission-api/src/api/users/dtos/entrant-data.dto";
import {RepresentativeDataDto} from "$/admission-api/src/api/users/dtos/representative-data.dto";
import {CustomerDataDto} from "$/admission-api/src/api/users/dtos/customer-data.dto";

export type User = {
    id: string;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    role: Role;
    benefit: boolean;
    competitivePoint: number;
    telegramId: bigint;
    expectedSpecialities: string;
    isDorm: boolean;
    printedEdbo: boolean;
    phone: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    contracts: ContractDto[];
    entrantData?: EntrantDataDto;
    representativeData?: RepresentativeDataDto;
    customerData?: CustomerDataDto;
}
