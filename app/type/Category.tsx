import { UmrahPackage } from "./UmrahPackage";

export default class Category {
    id: number;
    status: string;
    list?:UmrahPackage[];
    name: string;
    created_at: Date;
    updated_at: Date;
    packages_count: number;

    constructor(id: number, status: string, name: string, created_at: Date, updated_at: Date, packages_count: number) {
        this.id = id;
        this.status = status;
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.packages_count = packages_count;
    }

    static fromJson(json: any): Category {
        return new Category(
            json.id,
            json.status,
            json.name,
            new Date(json.created_at),
            new Date(json.updated_at),
            json.packages_count
        );
    }

    toJson(): any {
        return {
         
            status: this.status,
            name: this.name
           
        };
    }

    static getDummy(): Category {
        return new Category(
            0,
            'active',
            '',
            new Date(),
            new Date(),
            0
        );
    }
}
