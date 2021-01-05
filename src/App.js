import React, { useEffect } from 'react'
import $ from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/scss/index.scss'
import './assets/scss/fonts.scss'

import { Container, Card, Col, Row, Image, Badge, Button } from 'react-bootstrap'

import Profile from './assets/img/profile.jpg'
import ComandappLogo from './assets/img/comandappIcon.png'
import Terminal from './assets/img/terminal.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCalendar, faEnvelope, faMapMarkerAlt, faMobileAlt, faUniversity } from '@fortawesome/free-solid-svg-icons'

const App = () => {

	useEffect(() => {
		var canvas = $('#canvas')[0];
		var context = canvas.getContext('2d');

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		var Dots = [];
		var colors = ['#FF9900', '#424242', '#BCBCBC', '#3299BB'];
		var maximum = 150;

		function Initialize() {
			GenerateDots();
	
			Update();
		}
	
		function Dot() {
			this.active = true;
	
			this.diameter = Math.random() * 7;
	
			this.x = Math.round(Math.random() * canvas.width);
			this.y = Math.round(Math.random() * canvas.height);
	
			this.velocity = {
				x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7,
				y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7
			};
	
			this.alpha = 0.1;
			this.hex = colors[Math.round(Math.random() * 3)];
			this.color = HexToRGBA(this.hex, this.alpha);
		}
	
		Dot.prototype = {
			Update: function() {
				if(this.alpha < 0.8) {
				this.alpha += 0.01;
				this.color = HexToRGBA(this.hex, this.alpha);
				}
	
				this.x += this.velocity.x;
				this.y += this.velocity.y;
	
				if(this.x > canvas.width + 5 || this.x < 0 - 5 || this.y > canvas.height + 5 || this.y < 0 - 5) {
				this.active = false;
				}
			},
	
			Draw: function() {
				context.fillStyle = this.color;
				context.beginPath();
				context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
				context.fill();
			}
		}
	
		function Update() {
			GenerateDots();
	
			Dots.forEach(function(Dot) {
				Dot.Update();
			});
	
			Dots = Dots.filter(function(Dot) {
				return Dot.active;
			});
	
			Render();
			requestAnimationFrame(Update);
		}
	
		function Render() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			Dots.forEach(function(Dot) {
				Dot.Draw();
			});
		}
	
		function GenerateDots() {
			if(Dots.length < maximum) {
				for(var i = Dots.length; i < maximum; i++) {
				Dots.push(new Dot());
				}
			}
	
			return false;
		}
	
		function HexToRGBA(hex, alpha) {
			var red = parseInt((TrimHex(hex)).substring(0, 2), 16);
			var green = parseInt((TrimHex(hex)).substring(2, 4), 16);
			var blue = parseInt((TrimHex(hex)).substring(4, 6), 16);
	
			return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
		}
	
		function TrimHex(hex) {
			return (hex.charAt(0) === "#") ? hex.substring(1, 7) : hex;
		}
	
		$(window).resize(function() {
			Dots = [];
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});

		Initialize();
	}, [])

  	return (
		<Container style={{ marginTop: '10rem' }}>
			<canvas id='canvas' style={{ position: 'absolute', top: '0', left: '0' }}></canvas>
			<Row className='mx-0 mx-md-n3 mx-lg-n4 mx-xl-n5'>
				<Col xs={12} lg={4} className='text-dark'>
					<Card className='text-center bg-light border-0 shadow-lg'>
						<Image src={Profile} rounded width='40%' className='mx-auto' style={{ marginTop: '-4rem' }}/>
						<h2 className='mt-4'>Victor  <b>Helguero</b></h2>
						<h4 className='mb-3'><Badge variant='info' className='font-weight-light'>Administración de Empresas <br/> UDEP</Badge></h4>

						<div className='d-flex justify-content-center mb-4'>
							<a href='https://www.linkedin.com/in/victor-helguero-8807a3143/' className='link-dark'><FontAwesomeIcon size='lg' icon={faLinkedin} className='mx-2'/></a>
							<a href='https://wa.me/+51098711080' className='link-dark'><FontAwesomeIcon size='lg' icon={faWhatsapp} className='mx-2'/></a>
						</div>

						<div className='bg-dark w-100 h-100 rounded-bottom text-light p-4'>
							<ul className='m-0 p-0 text-left' style={{ listStyle: 'none' }}>
								<li>
									<FontAwesomeIcon icon={faCalendar} className='mr-2'/> Febrero 06, 1998
								</li>
								<li>
									<FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2'/> Lima, Peru
								</li>
								<li>
									<FontAwesomeIcon icon={faEnvelope} className='mr-2'/> <a href='mailto:vmhs1998@gmail.com'>vmhs1998@gmail.com</a>
								</li>
								<li>
									<FontAwesomeIcon icon={faMobileAlt} className='mr-2'/> +51 0987 11080
								</li>
								<li>
									<FontAwesomeIcon icon={faUniversity} className='mr-2'/> Universidad de Piura
								</li>
							</ul>
							<Button as='a' href='/cv.docx' variant='info' className='rounded-pill mt-3' size='lg' block download>Descargar CV</Button>
						</div>
					</Card>
				</Col>
				<Col className='mt-4 mt-lg-0'>
					<Card className='bg-light border-0 shadow-lg p-4'>
						<h2 className='mt-4 font-weight-bold'>Sobre Mi</h2>
						<div className='separator'></div>

						<small>
							<p>
								Soy un estudiante de la carrera de administración de empresas de la universidad de Piura, actualmente me encuentro en el setimo ciclo y pienso especializarme en la rama de negocios digitales. Tengo 22 años y soy de Lima.
							</p>
							<p>
								Estudie en el colegio Carmelitas, donde desde chico participé en actividades extracurriculares deportivas.
							</p>
							<p>
								Me gustan las computadoras y la tecnología y desde chico he experimentado haciendo juegos y programas. También me gusta el deporte, en especial el atletismo (he participado en varios campeonatos a nivel de Lima y Nacional. Fui campeón de la copa ADECORE y obtuve el tercer lugar en el campeonato nacional de atletismo en la disciplina de 110 metros con vallas.) y montar bicicleta. Soy bastante hábil con la mecánica y me gusta siempre aprender cosas nuevas, si hay algo que no puedo hacer busco la forma de aprenderlo.
							</p>
							<p>
								Actualmente tengo un emprendimiento digital, he desarrollado un programa de facturación electrónica y punto de venta para restaurantes, orientado al manejo de delivery.
							</p>
						</small>

						<div className='bg-dark mx-n4 px-4 text-light'>
							<h2 className='mt-4 font-weight-bold mb-4'>Mis Proyectos</h2>
							<Row xs={1} lg={2} className='text-dark'>
								<Col className='mb-3'>
									<Card className='p-3 d-flex flex-row'>
										<img src={ComandappLogo} width='50px' height='50px' className='mr-3' alt='comandapp'/>
										<div>
											<h5 className='font-weight-bold mb-0'>Comandapp</h5>
											<p className='small mb-0'>Facturación electrónica para tu restaurante. Potente y fácil de usar.</p>
											<a className='link-dark float-right' href="https://comandapp.pe/">Ver</a>
										</div>
									</Card>
								</Col>
								<Col className='mb-3'>
									<Card className='p-3 d-flex flex-row'>
										<div>
											<h5 className='font-weight-bold mb-0'>Pagina Web Terminal Fusion</h5>
											<p className='small mb-0'>Pide atraves de la web.</p>
											<a className='link-dark float-right' href="https://www.terminalfusion.rest/">Ver</a>
										</div>
									</Card>
								</Col>
							</Row>
						</div>
					</Card>
				</Col>
			</Row>
		</Container>
  	)
}

export default App
