import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем, есть ли заголовок авторизации
  const authHeader = request.headers.get('authorization');
  
  // Получаем пароль из переменных окружения
  const password = process.env.SITE_PASSWORD || 'foto0850';
  
  if (!authHeader) {
    // Если нет заголовка авторизации, запрашиваем Basic Auth
    return new NextResponse('Access Denied. Please enter password.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Fotofactor Strategic Hub", charset="UTF-8"',
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }

  // Парсим Basic Auth заголовок
  const [scheme, credentials] = authHeader.split(' ');
  
  if (scheme !== 'Basic' || !credentials) {
    return new NextResponse('Invalid authentication format', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Fotofactor Strategic Hub", charset="UTF-8"',
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }

  try {
    // Декодируем credentials (base64)
    const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
    const [username, userPassword] = decoded.split(':');

    // Проверяем пароль (username может быть любым)
    if (userPassword !== password) {
      return new NextResponse('Invalid password', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Fotofactor Strategic Hub", charset="UTF-8"',
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }
  } catch (error) {
    // Ошибка декодирования
    return new NextResponse('Authentication error', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Fotofactor Strategic Hub", charset="UTF-8"',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  // Если пароль верный, пропускаем запрос дальше
  return NextResponse.next();
}

// Применяем middleware ко всем страницам кроме API и статичных файлов
export const config = {
  matcher: [
    /*
     * Применяется ко всем путям кроме:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 