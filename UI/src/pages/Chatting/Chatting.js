import React from 'react'
import '../Chatting/Chatting.css'
import caramel from './caramel.PNG';
import fairooz from './fairooz.PNG';
import kids from './kids.PNG';
import LOGO from './LOGO.jpg';
import p1 from './p1.png';
import sweet from './sweet.PNG';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Chatting() {
  return (
    <div className="container-fluid h-100">
			<div className="row justify-content-center h-100">
				<div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header">
						<div className="input-group">
							<input type="text" placeholder="Search..." name="" className="form-control search"/>
							<div className="input-group-prepend">
								<span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
							</div>
						</div>
					</div>
					<div className="card-body contacts_body">
						<ui className="contacts">
						<li className="active">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src={LOGO} className="rounded-circle user_img"/>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Salma Plants</span>
									<p>Online</p>
								</div>
							</div>
						</li>
						<li>
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src={caramel} className="rounded-circle user_img"/>
									<span className="online_icon offline"></span>
								</div>
								<div className="user_info">
									<span>caramelchocolate.ps</span>
									<p>Left 7 mins ago</p>
								</div>
							</div>
						</li>
						<li>
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src={fairooz} className="rounded-circle user_img"/>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Fairooz.crochet</span>
									<p>Online</p>
								</div>
							</div>
						</li>
						<li>
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src={kids} className="rounded-circle user_img"/>
									<span className="online_icon offline"></span>
								</div>
								<div className="user_info">
									<span>kids_brands.ps</span>
									<p>Left 30 mins ago</p>
								</div>
							</div>
						</li>
						<li>
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src={sweet} className="rounded-circle user_img"/>
									<span className="online_icon offline"></span>
								</div>
								<div className="user_info">
									<span>lanasweet94
																			</span>
									<p>Left 50 mins ago</p>
								</div>
							</div>
						</li>
						</ui>
					</div>
					<div className="card-footer"></div>
				</div></div>
				<div className="col-md-8 col-xl-6 chat">
					<div className="card">
						<div className="card-header msg_head">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src={LOGO} className="rounded-circle user_img"/>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Salma Plants</span>
									
								</div>
								
							</div>
							<span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
							<div className="action_menu">
								<ul>
									<li><i className="fas fa-user-circle"></i> View profile</li>
									<li><i className="fas fa-users"></i> Add to close friends</li>
									<li><i className="fas fa-plus"></i> Add to group</li>
									<li><i className="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div className="card-body msg_card_body">
							<div className="d-flex justify-content-start mb-4">
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									Hi, I want to ask ypu about the last plant you order please
									<span className="msg_time_send">8:55 AM, Today</span>
								</div>
								<div className="img_cont_msg">
							<img src={p1} className="rounded-circle user_img_msg"/>
								</div>
							</div>
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src={LOGO} className="rounded-circle user_img_msg"/>
								</div>
								<div className="msg_cotainer">
								     welcome aya! yes it's available
									<span className="msg_time">9:00 AM, Today</span>
								</div>
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									How much is it??
									<span className="msg_time_send">9:05 AM, Today</span>
								</div>
								<div className="img_cont_msg">
							<img src={p1} className="rounded-circle user_img_msg"/>
								</div>
							</div>
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src={LOGO} className="rounded-circle user_img_msg"/>
								</div>
								<div className="msg_cotainer">
									35 shekels
									<span className="msg_time">9:07 AM, Today</span>
								</div>
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									Ok, i want it please, keep it to me
									<span className="msg_time_send">9:10 AM, Today</span>
								</div>
								<div className="img_cont_msg">
						<img src={p1} className="rounded-circle user_img_msg"/>
								</div>
							</div>
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src={LOGO} className="rounded-circle user_img_msg"/>
								</div>
								<div className="msg_cotainer">
									sure, thanks for contact us
									<span className="msg_time">9:12 AM, Today</span>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="input-group">
								<div className="input-group-append">
									<span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
								</div>
								<textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
								<div className="input-group-append">
									<span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}
