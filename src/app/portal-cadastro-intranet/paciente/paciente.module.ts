import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PacienteRoutingModule, routedComponents } from './paciente-routing.module';

@NgModule({
    imports: [
        ThemeModule,
        PacienteRoutingModule,
    ],
    declarations: [
        ...routedComponents,
    ],
})
export class PacienteModule { }
