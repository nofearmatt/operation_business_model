import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем, есть ли заголовок авторизации
  const authHeader = request.headers.get('authorization');
  
  // Получаем пароль из переменных окружения
  const password = process.env.SITE_PASSWORD || 'foto0850';
  
  if (!authHeader) {
    // Если нет заголовка авторизации, запрашиваем Basic Auth
    return new NextResponse('Введите пароль для доступа к сайту', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Стратегический Хаб Фотофактор"',
      },
    });
  }

  // Парсим Basic Auth заголовок
  const [scheme, credentials] = authHeader.split(' ');
  
  if (scheme !== 'Basic' || !credentials) {
    return new NextResponse('Неверный формат авторизации', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Стратегический Хаб Фотофактор"',
      },
    });
  }

  // Декодируем credentials (base64)
  const [username, userPassword] = Buffer.from(credentials, 'base64')
    .toString()
    .split(':');

  // Проверяем пароль (username может быть любым)
  if (userPassword !== password) {
    return new NextResponse('Неверный пароль', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Стратегический Хаб Фотофактор"',
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