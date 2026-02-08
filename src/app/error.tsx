'use client'  // Error boundaries DEBEN ser Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

/**
 * Props que Next.js pasa automáticamente al error boundary
 */
interface ErrorProps {
  error: Error & { digest?: string };  // Error capturado + ID único opcional
  reset: () => void;                   // Función para intentar recuperarse
}

/**
 * Error Boundary de Next.js
 * 
 * Se activa cuando:
 * - Falla el fetch de datos en page.tsx
 * - Hay un error de runtime en cualquier componente hijo
 * - Falla la renderización
 * 
 * Next.js automáticamente:
 * - Captura el error
 * - Renderiza este componente
 * - Pasa el error y la función reset como props
 * 
 * @param error - Objeto de error capturado
 * @param reset - Función para reintentar (re-renderiza page.tsx)
 */
export default function Error({ error, reset }: ErrorProps) {
  // Efecto para loguear el error (útil para debugging y monitoreo)
  useEffect(() => {
    // En producción, aquí enviarías el error a un servicio como Sentry
    console.error('Error capturado por error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Icono de error */}
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        {/* Mensaje principal */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an error while loading the bicycle networks.
            Please try again.
          </p>
        </div>

        {/* Detalles técnicos (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="rounded-lg bg-muted p-4 text-left">
            <p className="text-sm font-mono text-destructive break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Botón para reintentar */}
          <Button 
            onClick={reset}
            className="w-full sm:w-auto"
          >
            Try again
          </Button>

          {/* Botón para volver al inicio */}
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto"
          >
            Go to home
          </Button>
        </div>

        {/* Información adicional */}
        <p className="text-xs text-muted-foreground">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}