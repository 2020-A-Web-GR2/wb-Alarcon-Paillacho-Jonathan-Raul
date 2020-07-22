import {Module} from "@nestjs/common";
import {DeberController} from "./deber.controller";

@Module({
    imports: [],
    controllers: [
        DeberController
    ],
    providers: []
})

export class DeberModule {

}