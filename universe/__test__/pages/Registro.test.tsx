// __tests__/Registro.test.tsx
import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Registro from '@Pages/Registro';

// Mock de useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('verificacion de captcha en el registro', () => {
  const push = jest.fn();
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = "6LcrWuYpAAAAAPn3t5Jw-1NZcEyLr6g9HV_BsHw_"

  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
    jest.clearAllMocks();
  });

  test('El registro no funciona con exito cuando una maquinaintentea pasar el catpcha', async () => {
    console.log("Primera prueba")
    render(<Registro />);

    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), { target: { value: 'Password123' } });

    // fireEvent.click(screen.getByTitle('reCAPTCHA'));
    const captcha = document.getElementById('captcha');
    fireEvent.click(captcha!);

    fireEvent.click(screen.getByText('REGISTRATE'));


    await waitFor(() => {
      expect(screen.getByText('Debe completar el captcha')).toBeInTheDocument();
    });

    expect(push).not.toHaveBeenCalledWith('/2fa');
  });
  test('El registro no funciona con exito si el catpcha no es completado', async () => {
    console.log("segunda prueba")
    render(<Registro />);

    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), { target: { value: 'Password123' } });


    fireEvent.click(screen.getByText('REGISTRATE'));


    await waitFor(() => {
      expect(screen.getByText('Debe completar el captcha')).toBeInTheDocument();
    });

    expect(push).not.toHaveBeenCalledWith('/2fa');
  });

});

describe('Prueba de restricciones en los inputs', () => {

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = "6LcrWuYpAAAAAPn3t5Jw-1NZcEyLr6g9HV_BsHw_"

  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });



  test('No da error si los campos de son llenados con datos esperados', async () => {
    // Establecer las variables de entorno si es necesario
    // Importar el módulo después de establecer las variables de entorno
    console.log("tercera prueba")
    render(<Registro />);


    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'testusa' } });
    })

    // copleta el correo con datos validos
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    })


    /// completa la contraseña con datos validos
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'Password123' } });
    })


    // completa confirmar contraseña con datos validos
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), { target: { value: 'Password123' } });
    })

    // Completa el formulario con datos válidos


    const errorMessages = [
      'El nombre de usuario no puede comenzar ni terminar con espacios en blanco',
      'El nombre de usuario no puede ser solo espacios en blanco',
      'El nombre de usuario debe incluir al menos 8 caracteres',
      'El nombre de usuario no debe sobrepasar los 15 caracteres',
      'Campo requerido', // Puede ser genérico para cualquier campo
      'El email no puede comenzar ni terminar con espacios en blanco',
      'El email no puede ser solo espacios en blanco',
      'El email ingresado no es válido',
      'La contraseña no puede comenzar ni terminar con espacios en blanco',
      'La contraseña no puede ser solo espacios en blanco',
      'La contraseña debe incluir al menos 8 caracteres',
      'La contraseña no debe exceder los 32 caracteres',
      'La confirmación de la contraseña no puede comenzar ni terminar con espacios en blanco',
      'La confirmación de la contraseña no puede ser solo espacios en blanco',
      'Las contraseñas no coinciden'
    ];

    fireEvent.click(screen.getByText('REGISTRATE'));
    await waitFor(() => {


      errorMessages.forEach(errorMessage => {
        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
      });

    });

  });
  test('Muetra error con un usuario muy largo', async () => {
    // Establecer las variables de entorno si es necesario
    // Importar el módulo después de establecer las variables de entorno
    console.log("tercera prueba")
    render(<Registro />);


    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'testsdddddddddddsssssssssssssssusa' } });
    })

    fireEvent.click(screen.getByText('REGISTRATE'));
    await waitFor(() => {
      expect(screen.queryByText("El nombre de usuario no debe sobrepasar los 15 caracteres")).toBeInTheDocument();

    });

  });
  test('Muestra error cuando el nombre de usuario está vacío', async () => {
    render(<Registro />);

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'correo@valido.com' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'ContraseñaValida123' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), { target: { value: 'ContraseñaValida123' } });
    });

    const submitButton = screen.getByText('REGISTRATE');
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Campo requerido')).toBeInTheDocument();
    });
});

test('Muestra error cuando la contraseña es demasiado corta', async () => {
    render(<Registro />);

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'usuario_valido' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'correo@valido.com' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'short' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), { target: { value: 'short' } });
    });

    const submitButton = screen.getByText('REGISTRATE');
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('La contraseña debe incluir al menos 8 caracteres')).toBeInTheDocument();
    });
});

test('Muestra error cuando la confirmación de la contraseña no coincide', async () => {
    render(<Registro />);

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'usuario_valido' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'correo@valido.com' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'ContraseñaValida123' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), { target: { value: 'OtraContraseña' } });
    });

    const submitButton = screen.getByText('REGISTRATE');
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
    });
});

test('Muestra error cuando el nombre de usuario es solo espacios en blanco', async () => {
    render(<Registro />);

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: '     ' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'correo@valido.com' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'ContraseñaValida123' } });
    });

    await waitFor(() => {
        fireEvent.change(screen.getByPlaceholderText('Confirmar contraseña'), { target: { value: 'ContraseñaValida123' } });
    });

    const submitButton = screen.getByText('REGISTRATE');
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('El nombre de usuario no puede ser solo espacios en blanco')).toBeInTheDocument();
    });
});
});
