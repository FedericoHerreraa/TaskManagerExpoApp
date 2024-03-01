import { AuthProvider } from '@/context/AuthContext';
import { ScrollViewStyleReset } from 'expo-router/html';
import { TaskProvider } from '@/context/TaskContext';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TaskProvider>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

            <ScrollViewStyleReset />

            <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />

          </head>
          <body>{children}</body>
        </html>
      </TaskProvider>
    </AuthProvider>
  );
}

const responsiveBackground = `
  body {
    background-color: #fff;
  }
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #000;
    }
  }
`;
