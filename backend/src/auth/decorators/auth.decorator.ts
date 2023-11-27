import { applyDecorators, UseGuards } from '@nestjs/common'
import { Role } from "../../common/enums/rol.enum";
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { AuthGuard } from '../guard/auth.guard';

export function Auth(role: Role){
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    )

}