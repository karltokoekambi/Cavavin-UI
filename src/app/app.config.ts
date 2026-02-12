import { provideHttpClient } from '@angular/common/http';
// ... autres imports

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient() // <--- Ajoute cette ligne
    ]
};