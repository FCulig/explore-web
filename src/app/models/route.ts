import { User } from "./user";

export class Route {
    id: string;
    name: string;
    description: string;
    type: string;
    image_name: string;
    coordinates: string;
    user: User;
}
