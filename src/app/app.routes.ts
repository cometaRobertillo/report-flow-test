import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/report/report.component').then(c => c.ReportComponent)
    }
];
