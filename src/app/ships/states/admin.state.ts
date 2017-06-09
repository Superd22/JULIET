import { JulietRightsService } from './../../juliet-common/services/juliet-rights.service';
import { Ng2StateDeclaration } from '@uirouter/angular';
import { AdminTypesComponent } from "../components/admin-types/admin-types.component";

export let HangarAdminTypes: Ng2StateDeclaration = {
    name: "secure.Hangar.adminTypes",
    url: 'admin/types',
    views: { "hangar": { component: AdminTypesComponent } }, 
    resolve: {
        "_auth": [JulietRightsService, adminShipResolve],
    },
}

export function adminShipResolve(auth:JulietRightsService) {
    return auth.can_admin_juliet();
}