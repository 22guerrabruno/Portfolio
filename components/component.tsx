'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Logo from './Logo';
import Image from 'next/image';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useCallback, useState, useEffect } from 'react';

import { BiLogoJavascript, BiLogoTailwindCss } from 'react-icons/bi';
import { FaGithubSquare, FaLinkedin, FaNodeJs, FaReact } from 'react-icons/fa';
import { BiLogoTypescript } from 'react-icons/bi';
import { SiMongodb, SiMysql } from 'react-icons/si';
import { TiHtml5 } from 'react-icons/ti';
import { DiCss3 } from 'react-icons/di';
import { SiDocker } from 'react-icons/si';
import { RiNextjsLine } from 'react-icons/ri';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

export function Component() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  }, [setIsDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, toggleDropdown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/send', formData);
      if (response.status === 200) {
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        scrollToTop();
      }
    } catch {
    } finally {
      setLoading(false);
    }
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
  };
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/BRUNOGUERRAESPCV.pdf'; // Ruta del archivo en la carpeta `public`
    link.download = 'BRUNOGUERRAESPCV.pdf'; // Nombre del archivo que se descargará
    link.click();
  };

  return (
    <div className='flex flex-col min-h-[100dvh] dark:bg-muted dark:text-muted-foreground '>
      <header className='bg-background lg:px-6 h-14 flex items-center justify-between shadow-sm dark:bg-muted'>
        <Link
          href='#hero'
          className='flex items-center justify-center'
          prefetch={false}>
          <Logo />
          <span className='sr-only'>Portfolio</span>
        </Link>
        <div className='w-full flex items-center justify-end mr-4 gap-2'>
          <div className='flex flex-col'>
            <Image
              onClick={() => setIsEnglish(true)}
              src='/English_language.png'
              width='30'
              height='30'
              alt='Flag1'
              className='object-cover rounded-full'
            />
            <hr
              className={cn(
                'bg-gray-900 h-[2px] w-full mt-1',
                !isEnglish && 'bg-transparent'
              )}
            />
          </div>
          <div className='flex flex-col'>
            <Image
              onClick={() => setIsEnglish(false)}
              src='/spain-sign-language.png'
              width='30'
              height='30'
              alt='Flag1'
              className='object-cover rounded-full'
            />
            <hr
              className={cn(
                'bg-gray-900 h-[2px] w-full mt-1',
                isEnglish && 'bg-transparent'
              )}
            />
          </div>
        </div>
        <nav className='hidden lg:flex gap-4 sm:gap-6'>
          <Link
            href='#'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}>
            Home
          </Link>
          <Link
            href='#about'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}>
            About
          </Link>
          <Link
            href='#projects'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}>
            Projects
          </Link>
          <Link
            href='#cv'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}>
            CV
          </Link>
          <Link
            href='#contact'
            className='text-sm font-medium hover:underline underline-offset-4'
            prefetch={false}>
            Contact
          </Link>
        </nav>
        <Button
          variant='ghost'
          size='icon'
          className='lg:hidden relative'
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}>
          <GiHamburgerMenu className='h-6 w-6' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
        {isDropdownOpen && (
          <ul className=' lg:hidden absolute bg-gray-900 shadow-md rounded-md mt-2 py-1 w-48 dropdown-container top-12 right-0'>
            <li className='px-4 py-2 hover:bg-gray-100 text-gray-200 hover:text-gray-700'>
              <Link
                href='#about'
                onClick={(e) => {
                  e.stopPropagation();

                  toggleDropdown();
                }}>
                {isEnglish ? 'About Me' : 'Sobre Mi'}
              </Link>
            </li>
            <li className='px-4 py-2 hover:bg-gray-100 text-gray-200 hover:text-gray-700'>
              <Link
                href='#projects'
                onClick={(e) => {
                  e.stopPropagation();

                  toggleDropdown();
                }}>
                {isEnglish ? 'Projects' : 'Proyectos'}
              </Link>
            </li>
            <li className='px-4 py-2 hover:bg-gray-100 text-gray-200 hover:text-gray-700'>
              <Link
                href='#cv'
                onClick={(e) => {
                  e.stopPropagation();

                  toggleDropdown();
                }}>
                Curriculum
              </Link>
            </li>
            <li className='px-4 py-2 hover:bg-gray-100 text-gray-200 hover:text-gray-700'>
              <Link
                href='#cv'
                onClick={(e) => {
                  e.stopPropagation();

                  toggleDropdown();
                }}>
                {isEnglish ? 'Contact Me' : 'Contactar'}
              </Link>
            </li>
          </ul>
        )}
      </header>
      <section
        id='hero'
        className='w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-background px-10 md:px-20 lg:px-32'>
        <div className='container flex sm:flex-col lg:flex-row items-center justify-center gap-10 px-4 md:px-6 '>
          <Image
            src='/perfil.png'
            width='350'
            height='350'
            alt='Hero'
            className=' object-cover  '
          />
          <div className='space-y-4 self-center'>
            <h1
              className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-gabarito leading-6 
            space-x-4 '>
              {isEnglish ? "Hi, I'm" : 'Hola, soy'}
              <em className=' '> Bruno Guerra.</em> <br />{' '}
              {isEnglish
                ? 'Welcome to my portfolio'
                : 'Bienvenido a mi portfolio'}
              .
            </h1>
            {!isEnglish ? (
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Explora mis proyectos paralelos, conoce mi trayectoria y ponte
                en contacto conmigo. Vamos a construir algo increíble juntos.
              </p>
            ) : (
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Explore my side projects, learn about my background, and get in
                touch with me. Let's build something amazing together.
              </p>
            )}
          </div>
        </div>
      </section>
      <section
        id='about'
        className='w-full py-12 md:py-18 lg:py-24 bg-muted dark:bg-background px-10 md:px-20 lg:px-32'>
        <div className='container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12'>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              {isEnglish ? 'About Me' : 'Sobre Mi'}
            </h2>
            {!isEnglish ? (
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Soy un Full Stack Developer con un Máster en Desarrollo Web de
                la Escuela Nuclio, especializado en el stack MERN{' '}
                <em>(MongoDB, Express.js, React.js, Node.js)</em> .
                <br />
                Tengo experiencia en el desarrollo de componentes avanzados con
                React, seguridad web y testing de software.
                <br />
                Además, he trabajado con Docker, Cloudinary, Storybook,
                microservicios, CI/CD y despliegue en la nube. Mis habilidades
                también incluyen Typescript, bases de datos SQL, Websockets y
                SSR con Next.js. <br />
                En mi tiempo libre, me dedico a aprender sobre nuevas
                tecnologías y tendencias en desarrollo de software, siempre
                buscando proyectos desafiantes para seguir creciendo.
              </p>
            ) : (
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                I am a Full Stack Developer with a Master's in Web Development
                from Nuclio School, specializing in the MERN stack
                <em>(MongoDB, Express.js, React.js, Node.js)</em>.
                <br />
                I have experience in developing advanced components with React,
                web security, and software testing.
                <br />
                Additionally, I have worked with Docker, Cloudinary, Storybook,
                microservices, CI/CD, and cloud deployment. My skills also
                include Typescript, SQL databases, Websockets, and SSR with
                Next.js.
                <br />
                In my free time, I dedicate myself to learning about new
                technologies and trends in software development, always looking
                for challenging projects to continue growing.
              </p>
            )}

            <a
              target='_blank'
              href='http://linkedin.com/in/bruno-guerra-full-stack-developer-mern'
              className='h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm 
              font-medium text-primary-foreground 
              shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
              disabled:pointer-events-none disabled:opacity-50 flex gap-2 w-fit'>
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>
          <div className='flex flex-col justify-start space-y-4'>
            <div className='grid gap-1'>
              <h3 className='text-xl font-bold'>
                {isEnglish ? 'Skills' : 'Habilidades'}
              </h3>
              <div className='bg-black p-2 rounded-lg flex flex-wrap gap-2 justify-center'>
                <span>
                  <BiLogoJavascript
                    size={30}
                    fill='yellow'
                    className='bg-black'
                  />
                </span>
                <span className='relative'>
                  <div className='absolute top-2 right-1 bg-white w-4 h-4 flex items-center justify-center z-10' />
                  <BiLogoTypescript
                    size={30}
                    className='w-fit  text-blue-600 z-30 relative'
                  />
                </span>
                <span>
                  <FaReact
                    size={30}
                    className='bg-black text-sky-400'
                  />
                </span>
                <span>
                  <FaNodeJs
                    size={30}
                    className='bg-black text-green-600'
                  />
                </span>
                <span>
                  <TiHtml5
                    size={30}
                    className='bg-black text-orange-600'
                  />
                </span>
                <span>
                  <SiMongodb
                    size={30}
                    className='bg-black text-green-600'
                  />
                </span>
                <span>
                  <RiNextjsLine
                    size={30}
                    className='bg-black text-white'
                  />
                </span>
                <span>
                  <DiCss3
                    size={30}
                    className='bg-black text-blue-600'
                  />
                </span>
                <span>
                  <SiMysql
                    size={30}
                    className='bg-black text-white'
                  />
                </span>

                <span>
                  <SiDocker
                    size={30}
                    className='bg-black text-sky-400'
                  />
                </span>
                <span>
                  <BiLogoTailwindCss
                    size={30}
                    className='bg-black text-sky-600'
                  />
                </span>
              </div>
            </div>
            <div className='grid gap-1'>
              <h3 className='text-xl font-bold'>
                {isEnglish ? 'Experience' : 'Experiencia'}
              </h3>
              {!isEnglish ? (
                <p className='text-muted-foreground'>
                  Más de 2 años como desarrollador web, trabajando en varios
                  proyectos para clientes como en proyectos personales.
                </p>
              ) : (
                <p className='text-muted-foreground'>
                  2+ years as a web developer, worked on various client projects
                  and personal side projects.
                </p>
              )}
            </div>
            <div className='grid gap-1'>
              <h3 className='text-xl font-bold'>
                {isEnglish ? 'Education' : 'Estudios'}
              </h3>
              <div className=' max-w-4xl mx-auto'>
                <div className='mb-6'>
                  <h2 className='text-lg font-bold'>
                    Full Stack Developer - Desarrollo de Aplicaciones Web
                  </h2>
                  <p className='text-muted-foreground'>
                    Nuclio Digital School - Barcelona, 09/2023
                  </p>
                  <p className='text-muted-foreground'>
                    <em>
                      (MERN, Docker, WebSockets, TypeScript, SQL, JWT, Jest,
                      Vitest …)
                    </em>
                  </p>
                </div>
                <div>
                  <h2 className='text-lg font-bold'>
                    Desarrollo Web HTML - CSS - JavaScript
                  </h2>
                  <p className='text-muted-foreground'>
                    Free Code Camp - Online, 04/2023
                  </p>
                  <p className='text-muted-foreground'>
                    HTML, CSS y JavaScript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id='projects'
        className='w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-background px-10 md:px-20 lg:px-32'>
        <div className='container grid gap-6 px-4 md:px-6'>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              {isEnglish ? 'My Side Projects' : 'Mis Proyectos Personales'}
            </h2>
            {isEnglish ? (
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Check out some of the side projects I've worked on in my free
                time.
              </p>
            ) : (
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Descubre algunos de los proyectos personales en los que he
                trabajado en mi tiempo libre.
              </p>
            )}
          </div>
          <div className='grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
            <Card className='flex flex-col h-full'>
              <CardHeader>
                <CardTitle>TaskTalk</CardTitle>
              </CardHeader>
              <CardContent className='flex-grow'>
                {!isEnglish ? (
                  <div className='max-w-4xl mx-auto p-6'>
                    <p className='mb-4'>
                      <strong>TaskTalk</strong> es una herramienta colaborativa
                      diseñada para optimizar la comunicación y la gestión de
                      proyectos en equipo. Con TaskTalk, puedes crear grupos
                      para cada equipo con el que trabajas, permitiéndote
                      chatear, realizar videollamadas y gestionar tareas de
                      manera eficiente a través de un dashboard intuitivo.
                    </p>
                    <ul className='list-disc list-inside mb-4'>
                      <li>
                        <strong>Comunicación Efectiva</strong>: Facilita la
                        interacción entre los miembros del equipo mediante chat
                        y videollamadas integradas.
                      </li>
                      <li>
                        <strong>Gestión de Tareas</strong>: Utiliza el dashboard
                        de tareas para visualizar y seguir el progreso de tu
                        proyecto en tiempo real.
                      </li>
                      <li>
                        <strong>Optimización del Equipo</strong>: Saca el máximo
                        partido a tu equipo con herramientas que mejoran la
                        organización y la colaboración.
                      </li>
                    </ul>
                    <p>
                      TaskTalk es la solución perfecta para mantener a todos en
                      la misma página y asegurar el éxito de tus proyectos.
                    </p>
                  </div>
                ) : (
                  <div className='max-w-4xl mx-auto p-6'>
                    <p className='mb-4'>
                      <strong>TaskTalk</strong> is a collaborative tool designed
                      to optimize communication and project management for
                      teams. With TaskTalk, you can create groups for each team
                      you work with, allowing you to chat, make video calls, and
                      manage tasks efficiently through an intuitive dashboard.
                    </p>
                    <ul className='list-disc list-inside mb-4'>
                      <li>
                        <strong>Effective Communication</strong>: Facilitates
                        interaction among team members through integrated chat
                        and video calls.
                      </li>
                      <li>
                        <strong>Task Management</strong>: Use the task dashboard
                        to visualize and track your project's progress in
                        real-time.
                      </li>
                      <li>
                        <strong>Team Optimization</strong>: Get the most out of
                        your team with tools that enhance organization and
                        collaboration.
                      </li>
                    </ul>
                    <p>
                      TaskTalk is the perfect solution to keep everyone on the
                      same page and ensure the success of your projects.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className=' flex items-center justify-end gap-2'>
                <a
                  href='https://tasktalkapp-production.up.railway.app/'
                  className='flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 
                  text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                  disabled:pointer-events-none disabled:opacity-50 gap-2 whitespace-nowrap'
                  target='_blank'>
                  {isEnglish ? 'App Link' : 'Enlace a la App'}
                </a>
                <a
                  href='https://github.com/22guerrabruno/TASKTALKAPP'
                  className='flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 
                  text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                  disabled:pointer-events-none disabled:opacity-50 gap-2'
                  target='_blank'>
                  <FaGithubSquare size={20} />
                  <span> Github</span>
                </a>
              </CardFooter>
            </Card>
            <Card className='flex flex-col h-full'>
              <CardHeader>
                <CardTitle>CaseSkull</CardTitle>
              </CardHeader>
              <CardContent className='flex-grow'>
                {isEnglish ? (
                  <div className='max-w-4xl mx-auto p-6'>
                    <p className='mb-4'>
                      <strong>caseSkull</strong> is an innovative application
                      that allows you to customize your phone case with your own
                      images, crop it to your liking, and add it to a phone case
                      to create a unique and personalized design.
                    </p>
                    <ul className='list-disc list-inside mb-4'>
                      <li>
                        <strong>Upload Your Image</strong>: Choose an image from
                        your device and upload it to the application to start
                        personalizing your case.
                      </li>
                      <li>
                        <strong>Crop to Your Liking</strong>: Use the cropping
                        tools to adjust the image and ensure it looks perfect on
                        your case.
                      </li>
                      <li>
                        <strong>Add to Cart</strong>: Once you have finished
                        designing, add the personalized case to your shopping
                        cart and complete the order.
                      </li>
                    </ul>
                    <p className='mb-4'>
                      <strong>caseSkull</strong> is the perfect solution for
                      those who want to have a unique and personalized phone
                      case, reflecting their style and personality.
                    </p>
                  </div>
                ) : (
                  <div className='max-w-4xl mx-auto p-6'>
                    <p className='mb-4'>
                      <strong>caseSkull </strong> es una aplicación innovadora
                      que te permite personalizar la carcasa de tu teléfono con
                      tus propias imágenes, recortarla a tu gusto y añadirla a
                      una carcasa de teléfono para crear un diseño único y
                      personalizado.
                    </p>
                    <ul className='list-disc list-inside mb-4'>
                      <li>
                        <strong>Sube tu Imagen</strong>: Elige una imagen desde
                        tu dispositivo y súbela a la aplicación para comenzar a
                        personalizar tu carcasa.
                      </li>
                      <li>
                        <strong>Recorta a tu Gusto</strong>: Utiliza las
                        herramientas de recorte para ajustar la imagen y
                        asegurarte de que se vea perfecta en tu carcasa.
                      </li>
                      <li>
                        <strong>Añade a la Cesta</strong>: Una vez que hayas
                        terminado de diseñar, añade la carcasa personalizada a
                        tu cesta de compra y finaliza el pedido.
                      </li>
                    </ul>
                    <p className='mb-4'>
                      <strong> caseSkull</strong> es la solución perfecta para
                      aquellos que desean tener una carcasa de teléfono única y
                      personalizada, reflejando su estilo y personalidad.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className=' flex items-center justify-end gap-2'>
                <a
                  href='https://case-skull.vercel.app/'
                  className='flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 
                  text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                  disabled:pointer-events-none disabled:opacity-50 gap-2 whitespace-nowrap'
                  target='_blank'>
                  {isEnglish ? 'App Link' : 'Enlace a la App'}
                </a>
                <a
                  href='https://github.com/22guerrabruno/caseSkull'
                  className='flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 
                  text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                  disabled:pointer-events-none disabled:opacity-50 gap-2'
                  target='_blank'>
                  <FaGithubSquare size={20} />
                  <span> Github</span>
                </a>
              </CardFooter>
            </Card>
            <Card className='flex flex-col h-full'>
              <CardHeader>
                <CardTitle>Messenger Clone</CardTitle>
              </CardHeader>
              <CardContent className='flex-grow'>
                {isEnglish ? (
                  <div className='max-w-4xl mx-auto p-6'>
                    <p className='mb-4'>
                      <strong>MessengerClone</strong> is an application that
                      replicates the functionality of Messenger, allowing you to
                      connect and chat with friends seamlessly.
                    </p>
                    <ul className='list-disc list-inside mb-4'>
                      <li>
                        <strong>Chat with Friends</strong>: Start conversations
                        with friends and family members in real-time.
                      </li>
                      <li>
                        <strong>Send Messages and Media</strong>: Share
                        messages, photos, videos, and more easily within the
                        app.
                      </li>
                    </ul>
                    <p className='mb-4'>
                      <strong>MessengerClone</strong> provides a seamless
                      communication platform for users who want to stay
                      connected with their social circle, offering a familiar
                      and user-friendly interface.
                    </p>
                  </div>
                ) : (
                  <div className='max-w-4xl mx-auto p-6'>
                    <p className='mb-4'>
                      <strong>MessengerClone</strong> es una aplicación que
                      replica la funcionalidad de Messenger, permitiéndote
                      conectar y chatear con amigos de manera fluida.
                    </p>
                    <ul className='list-disc list-inside mb-4'>
                      <li>
                        <strong>Chatea con Amigos</strong>: Inicia
                        conversaciones con amigos y familiares en tiempo real.
                      </li>
                      <li>
                        <strong>Envía Mensajes y Medios</strong>: Comparte
                        mensajes, fotos, videos y más fácilmente dentro de la
                        aplicación.
                      </li>
                    </ul>
                    <p className='mb-4'>
                      <strong>MessengerClone</strong> proporciona una plataforma
                      de comunicación fluida para usuarios que desean mantenerse
                      conectados con su círculo social, ofreciendo una interfaz
                      familiar y fácil de usar.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className=' flex items-center justify-end gap-2'>
                <a
                  href='https://messenger-clone-sigma-two.vercel.app/'
                  className='flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 
                  text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                  disabled:pointer-events-none disabled:opacity-50 gap-2 whitespace-nowrap'
                  target='_blank'>
                  {isEnglish ? 'App Link' : 'Enlace a la App'}
                </a>
                <a
                  href='https://github.com/22guerrabruno/messenger-clone'
                  className='flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 
                  text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                  disabled:pointer-events-none disabled:opacity-50 gap-2'
                  target='_blank'>
                  <FaGithubSquare size={20} />
                  <span> Github</span>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section
        id='cv'
        className='w-full py-12 bg-muted dark:bg-background px-10 md:px-20 lg:px-32'>
        <div className='container flex sm:flex-col lg:flex-row items-center justify-center gap-10 px-4 md:px-6 '>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              {isEnglish ? 'Download My CV' : 'Descarga Mi CV'}
            </h2>
            <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              {isEnglish
                ? 'Click the button below to download my latest CV and learn more about my professional experience and qualifications.'
                : `Haz clic en el botón de abajo para descargar mi CV más reciente y 
                conocer más sobre mi experiencia profesional y cualificaciones.`}
            </p>
            <a
              href='/BRUNOGUERRAESPCV.pdf'
              target='_blank'
              className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm 
              font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none 
              focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
              {isEnglish ? 'Download CV' : 'Descarga mi CV'}
            </a>
          </div>
          <div className='flex flex-col justify-center'>
            <Image
              src='/logo.png'
              width='550'
              height='310'
              alt='CV'
              className='object-cover'
            />
          </div>
        </div>
      </section>
      <section
        id='contact'
        className='w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-background px-10 md:px-20 lg:px-32'>
        <div className='container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12'>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              {isEnglish ? 'Get in Touch' : 'Contacta'}
            </h2>
            {isEnglish ? (
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Have a question or want to collaborate? Fill out the form below,
                and I'll get back to you as soon as possible.
              </p>
            ) : (
              <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                ¿Tienes alguna pregunta o deseas colaborar? Completa el
                formulario a continuación y me pondré en contacto contigo lo
                antes posible.
              </p>
            )}
          </div>
          <form
            className='space-y-4'
            onSubmit={handleSubmit}>
            <Input
              type='text'
              placeholder='Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full rounded-md bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors 
              focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed 
              disabled:opacity-50 dark:bg-muted'
            />
            <Input
              type='email'
              placeholder='Email'
              name='email'
              required
              value={formData.email}
              onChange={handleChange}
              className='w-full rounded-md bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors 
              focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed 
              disabled:opacity-50 dark:bg-muted'
            />
            <Textarea
              placeholder={isEnglish ? 'Message' : 'Mensaje'}
              required
              name='message'
              value={formData.message}
              onChange={handleChange}
              className='w-full rounded-md bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors 
              focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed 
              disabled:opacity-50 dark:bg-muted resize-none'
              rows={6}
            />
            <Button
              type='submit'
              disabled={loading}
              className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium 
              text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1
               focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 '>
              {loading ? (
                <div className='flex items-center justify-center gap-2'>
                  <Loader2
                    size={20}
                    className='animate-spin'
                  />
                  {isEnglish ? 'Submiting ...' : 'Ensviando...'}
                </div>
              ) : (
                <div>{isEnglish ? 'Submit' : 'Enviar'}</div>
              )}
            </Button>
          </form>
        </div>
      </section>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:bg-muted'>
        <p className='text-xs text-muted-foreground'>
          &copy; 2024 Bruno Guerra.{' '}
          {isEnglish ? 'All rights reserved' : 'Todos los derechos reservados'}.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          {/* <Link
            href='#'
            className='text-xs hover:underline underline-offset-4'
            prefetch={false}>
            Terms of Service
          </Link>
          <Link
            href='#'
            className='text-xs hover:underline underline-offset-4'
            prefetch={false}>
            Privacy Policy
          </Link> */}
        </nav>
      </footer>
    </div>
  );
}
