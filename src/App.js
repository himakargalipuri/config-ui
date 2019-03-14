import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';
import './bootstrap-grid.min.css';
import * as data from './configurator.json';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { configData: null, lvlData: [] };
	}

	componentDidMount() {
		this.setState({ configData: data.data, lvlData: [data.data[0]] });
	}

	lvlDataUpdate(d, i) {
		let { lvlData } = this.state;
		lvlData[i] = d;
		lvlData = lvlData.map((x, y) => ((y > i)? null : x));
		this.setState({ lvlData });
	}

	selectionConfigure(itemId, parentlvl) {
		let { configData, lvlData } = this.state,
			i = parentlvl;
		lvlData[i].selected = (lvlData[i].selectionType === 2) ?
			((lvlData[i].selected.indexOf(itemId) !== -1) ?
				lvlData[i].selected.filter((z) => (z !== itemId)) :
				lvlData[i].selected.push(itemId)
			) :
			itemId;
		for (let j = (parentlvl - 1); j >= 0; j--) {
			lvlData[j].content.map((x) => (x.id === lvlData[j].id) ? lvlData[j] : x);
		}
		configData.map((x) => (x.id === lvlData[0].id) ? lvlData[0] : x);
		this.setState({ configData, lvlData });
	}

	groupContent(x) {
		return (
			<div key={x.id} className="option-group-wrap">
				{
					x.content.map((y) =>
						y.status &&  // Element's status check
						<div key={y.id} className="option-group py-1">
							<p className="option-group-title px-1">{y.name}</p>
							{
								y.content.map((z) =>
									z.status && // Element's status check
									<button key={z.id} onClick={() => this.selectionConfigure(z.id, (z.level - 3))} type="button" className={'btn my-1 btn-outline-' + ((z.id === this.state.lvlData[z.level - 3].selected || (this.state.lvlData[z.level - 3].selected && Array.isArray(this.state.lvlData[z.level - 3].selected) && this.state.lvlData[z.level - 3].selected.indexOf(x.id) !== -1)) ? 'primary' : 'secondary')}>{z.name}</button>
								)
							}
						</div>
					)
				}
			</div>
		);
	}

	render() {
		return (
			<div className="appCover">
				{
					this.state.configData && // Content Loaded Check
					(<React.Fragment>

						{/* Top Navigation Code Start */}
						<div className="topNav">
							{
								this.state.configData.map((x) =>
									x.status && // Element's status check
									<button key={x.id} onClick={() => this.lvlDataUpdate(x, (x.level - 1))} type="button" className={'btn mx-1 btn-outline-' + ((x === this.state.lvlData[0]) ? 'primary' : 'secondary')}>{x.name}</button>
								)
							}
						</div>
						{/* Top Navigation Code End */}

						{/* Side Navigation Code Start */}
						<div className="sideBar">
							{
								this.state.lvlData[0].content.map((x) =>
									x.status && // Element's status check
									<button key={x.id} onClick={() => this.lvlDataUpdate(x, (x.level - 1))} type="button" className={'btn my-1 btn-outline-' + ((x === this.state.lvlData[1]) ? 'primary' : 'secondary')}>{x.name}</button>
								)
							}
						</div>
						{/* Side Navigation Code End */}

						{
							this.state.lvlData[1] && // Sidenav selected check
							this.state.lvlData[1].content && // Sidenav has content Check
							(<React.Fragment>

								{/* Lvl-One Navigation Code Start */}
								<div className="lvl-one">
									{
										(this.state.lvlData[1].type === 1) ?
											this.groupContent(this.state.lvlData[1]) :
											this.state.lvlData[1].content.map((x) => {
												return x.status && // Element's status check
													<button key={x.id} onClick={() => { (x.content) ? this.lvlDataUpdate(x, (x.level - 1)) : this.selectionConfigure(x.id, (x.level - 2)) }} type="button" className={'btn my-1 parent btn-outline-' + ((x === this.state.lvlData[2] || x.id === this.state.lvlData[1].selected || (this.state.lvlData[1].selected && Array.isArray(this.state.lvlData[1].selected) && this.state.lvlData[1].selected.indexOf(x.id) !== -1)) ? 'primary' : 'secondary')}>{x.name}</button>
											})
									}
									<div className="lvl-close" onClick={() => this.lvlDataUpdate(null, 1)}>X</div>
								</div>
								{/* Lvl-One Navigation Code End */}

								{
									this.state.lvlData[2] && // Sidenav selected check
									this.state.lvlData[2].content && // Sidenav has content Check
									(<React.Fragment>

										{/* Lvl-Two Navigation Code Start */}
										<div className="lvl-two">
											{
												(this.state.lvlData[2].type === 1) ?
													this.groupContent(this.state.lvlData[2]) :
													this.state.lvlData[2].content.map((x) => {
														return x.status && // Element's status check
															<button key={x.id} onClick={() => { (x.content) ? this.lvlDataUpdate(x, (x.level - 1)) : this.selectionConfigure(x.id, (x.level - 3)) }} type="button" className={'btn my-1 parent btn-outline-' + ((x === this.state.lvlData[3] || x.id === this.state.lvlData[1].selected || (this.state.lvlData[1].selected && Array.isArray(this.state.lvlData[1].selected) && this.state.lvlData[1].selected.indexOf(x.id) !== -1)) ? 'primary' : 'secondary')}>{x.name}</button>
													})
											}
											<div className="lvl-close" onClick={() => this.lvlDataUpdate(null, 2)}>X</div>
										</div>
										{/* Lvl-Two Navigation Code End */}

									</React.Fragment>)
								}

							</React.Fragment>)
						}

					</React.Fragment>)
				}
			</div>
		)
	}

	// render() {
	// 	return (
	// 		<div className="appCover">
	// 			<div className="topNav">
	// 				{
	// 					this.state.configData.map((x) =>
	// 						x.status && <button key={x.id} onClick={() => this.setState({ al1: x.id, al2: null, al3: null, al4: null })} type="button" className={'btn mx-1 btn-outline-' + ((x.id === this.state.al1) ? 'primary' : 'secondary')}>{x.name}</button>
	// 					)
	// 				}
	// 			</div>
	// 			<div className="sideBar">
	// 				{
	// 					this.state.configData.map((x) => {
	// 						if (x.id === this.state.al1) {
	// 							return x.content.map((y) =>
	// 								y.status && <button key={y.id} onClick={() => this.setState({ al2: y.id, al3: null, al4: null })} type="button" className={'btn my-1 btn-outline-' + ((y.id === this.state.al2) ? 'primary' : 'secondary')}>{y.name}</button>
	// 							)
	// 						}
	// 						else {
	// 							return null
	// 						}
	// 					})
	// 				}
	// 			</div>
	// 			{
	// 				this.state.al2 &&
	// 				<div className="lvl-one">
	// 					{
	// 						this.state.configData.map((x) => {
	// 							if (x.id === this.state.al1) {
	// 								return x.content.map((y) => {
	// 									if (y.id === this.state.al2) {
	// 										if (y.type === 1) {
	// 											return this.groupContent(y);
	// 										}
	// 										else {
	// 											return y.content.map((z) => {
	// 												return z.status && <button key={z.id} onClick={() => this.setState({ al3: z.id, al4: null })} type="button" className={'btn my-1 parent btn-outline-' + ((z.id === this.state.al3) ? 'primary' : 'secondary')}>{z.name}</button>
	// 											})
	// 										}
	// 									}
	// 									else {
	// 										return null
	// 									}
	// 								}
	// 								)
	// 							}
	// 							else {
	// 								return null
	// 							}
	// 						})
	// 					}
	// 					<div className="lvl-close" onClick={() => this.setState({ al2: null })}>X</div>
	// 				</div>
	// 			}
	// 			{
	// 				this.state.al3 &&
	// 				<div className="lvl-two">
	// 					{
	// 						this.state.configData.map((w) => {
	// 							if (w.id === this.state.al1) {
	// 								return w.content.map((x) => {
	// 									if (x.id === this.state.al2) {
	// 										return x.content.map((y) => {
	// 											if (y.id === this.state.al3) {
	// 												if (y.type === 1) {
	// 													return this.groupContent(y);
	// 												}
	// 												else {
	// 													return y.content.map((z) => {
	// 														return z.status && <button key={z.id} onClick={() => this.setState({ al4: z.id })} type="button" className={'btn my-1 btn-outline-' + ((z.id === this.state.al4) ? 'primary' : 'secondary')}>{z.name}</button>
	// 													})
	// 												}
	// 											}
	// 											else {
	// 												return null
	// 											}
	// 										})
	// 									}
	// 									else {
	// 										return null
	// 									}
	// 								})
	// 							}
	// 							else {
	// 								return null
	// 							}
	// 						})
	// 					}
	// 					<div className="lvl-close" onClick={() => this.setState({ al3: null })}>X</div>
	// 				</div>
	// 			}
	// 		</div>
	// 	);
	// }
}

export default App;