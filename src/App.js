import React, { useEffect, Fragment } from 'react'
import $ from 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/scss/index.scss'
import './assets/scss/fonts.scss'

import { Container, Card, Col, Row, Image, Badge, Button } from 'react-bootstrap'

import Profile from './assets/img/profile.jpg'
import ComandappLogo from './assets/img/comandappIcon.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons'
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
			Update: function () {
				if (this.alpha < 0.8) {
					this.alpha += 0.01;
					this.color = HexToRGBA(this.hex, this.alpha);
				}
	
				this.x += this.velocity.x;
				this.y += this.velocity.y;
	
				if (this.x > canvas.width + 5 || this.x < 0 - 5 || this.y > canvas.height + 5 || this.y < 0 - 5) {
					this.active = false;
				}
			},
	
			Draw: function () {
				context.fillStyle = this.color;
				context.beginPath();
				context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
				context.fill();
			}
		}
	
		function Update() {
			GenerateDots();
	
			Dots.forEach(function (Dot) {
				Dot.Update();
			});
	
			Dots = Dots.filter(function (Dot) {
				return Dot.active;
			});
	
			Render();
			requestAnimationFrame(Update);
		}
	
		function Render() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			Dots.forEach(function (Dot) {
				Dot.Draw();
			});
		}
	
		function GenerateDots() {
			if (Dots.length < maximum) {
				for (var i = Dots.length; i < maximum; i++) {
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
	
		$(window).resize(function () {
			Dots = [];
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});
	
		Initialize();
	}, [])

	return (
		<Fragment>
			<canvas id='canvas' style={{ position: 'fixed', top: '0', left: '0' }} />
			<Container style={{ marginTop: '10rem' }}>
				<Row>
					<Col xs={12} lg={4}>
						<Card className='border-0 shadow-lg'>
							<Image src={Profile} rounded width='40%' className='mx-auto' style={{ marginTop: '-4rem' }} />
							<h2 className='text-center mt-3'>
								Victor  Manuel Helguero Saco
							</h2>
							<h5 className='text-center my-2'>
								<Badge bg='info' className='font-weight-light'>
									UDEP-Administración de Empresas
								</Badge>
							</h5>

							<div className='d-flex justify-content-center my-3'>
								<a href='https://www.linkedin.com/in/victor-helguero-8807a3143/' className='link-dark'><FontAwesomeIcon size='lg' icon={faLinkedin} className='mx-2' /></a>
								<a href='https://wa.me/+51098711080' className='link-dark'><FontAwesomeIcon size='lg' icon={faWhatsapp} className='mx-2' /></a>
							</div>

							<div className='bg-dark w-100 h-100 rounded-bottom text-light p-4'>
								<ul className='m-0 p-0 text-left' style={{ listStyle: 'none' }}>
									<li>
										<FontAwesomeIcon icon={faCalendar} className='mr-2' /> Febrero 06, 1998
									</li>
									<li>
										<FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' /> Lima, Peru
									</li>
									<li>
										<FontAwesomeIcon icon={faEnvelope} className='mr-2' /> <a href='mailto:vmhs1998@gmail.com' className='link-light text-decoration-none'>vmhs1998@gmail.com</a>
									</li>
									<li>
										<FontAwesomeIcon icon={faMobileAlt} className='mr-2' /> +51 987 611 080
									</li>
									<li>
										<FontAwesomeIcon icon={faUniversity} className='mr-2' /> Universidad de Piura
									</li>
								</ul>
								<div className='d-flex justify-content-center mt-4'>
									<Button as='a' href='/cv.pdf' variant='info' size='lg' block download className='text-light'>Descargar CV</Button>
								</div>
							</div>
						</Card>
					</Col>
					<Col>
						<Card className='border-0 shadow-lg'>
							<Card.Body>
								<h2 className='font-weight-bold'>Sobre Mi</h2>
								<hr />

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
							</Card.Body>

							<Card.Body className='bg-dark text-light'>
								<h2 className='font-weight-bold mb-4'>Mis Proyectos</h2>
								<Row xs={1} lg={2} className='text-dark'>
									<Col className='mb-3'>
										<Card>
											<Card.Body className='d-flex flex-row align-items-center'>
												<img src={ComandappLogo} width='60px' height='60px' className='me-3' alt='comandapp' />

												<div>
													<h5 className='font-weight-bold mb-0'>Comandapp</h5>
													<p className='small mb-0'>Facturación electrónica para tu restaurante. Potente y fácil de usar.</p>
												</div>
											</Card.Body>
										</Card>
									</Col>
									<Col className='mb-3'>
										<Card className='h-100'>
											<Card.Body className='d-flex flex-row align-items-center'>
												<img src='https://icons-for-free.com/download-icon-webpage+website+icon-1320087271286406322_512.png' width='60px' height='60px' className='me-3' alt='comandapp' />

												<div>
													<h5 className='font-weight-bold mb-0'>Terminal Fusion</h5>
													<p className='small mb-0'>Pide makis online en Terminal Fusion.</p>
												</div>
											</Card.Body>
										</Card>
									</Col>
									<Col className='mb-3'>
										<Card className='h-100'>
											<Card.Body className='d-flex flex-row align-items-center'>
												<img src='https://icons-for-free.com/download-icon-webpage+website+icon-1320087271286406322_512.png' width='60px' height='60px' className='me-3' alt='comandapp' />

												<div>
													<h5 className='font-weight-bold mb-0'>Procargo Peru</h5>
													<p className='small mb-0'>Web para empresa de transporte especializado.</p>
												</div>
											</Card.Body>
										</Card>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment >
	)
}

export default App
