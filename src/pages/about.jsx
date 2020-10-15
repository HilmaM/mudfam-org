import React from 'react';

function AboutSection() {
    
    return ( 
      <>
      <div id="accordion">
        <div className="card">
          <div className="card-header text-center bg-primary">
            <a className="card-link" data-toggle="collapse" href="#collapseOne"> 
              <h3 className="tittle-w3ls mb-3"><span className="pink">Vision</span></h3>
            </a>
          </div>
          <div className="collapse show" id="collapseOne" data-parent="#accordion">
            <div className="card-body p-md-5 text-center">
              <p className="sub-tittle mt-3 mb-4">A sustainable people driven socio-economic development in the Zambezi Valley</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header text-center bg-secondary">
            <a className="card-link" data-toggle="collapse" href="#collapseTwo">
              <h3 className="tittle-w3ls mb-3"><span className="pink">Mission</span></h3>
            </a>
          </div>
          <div className="collapse" id="collapseTwo" data-parent="#accordion">
            <div className="card-body p-md-5 text-center">
              <p className="sub-tittle mt-3 mb-4">Basilwizi is committed to building the capacity of the Tonga and Korekore communities – men, women, young and old, able disabled – for them to realise improved and sustainable well-being and free themselves from poverty.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header text-center bg-dark">
            <a className="card-link" data-toggle="collapse" href="#collapseThree"> 
              <h3 className="tittle-w3ls mb-3"><span className="pink">Motto</span></h3>
            </a>
          </div>
          <div className="collapse" id="collapseThree" data-parent="#accordion">
            <div className="card-body p-md-5 text-center">
              <p className="sub-tittle mt-3 mb-4">The last shall be first</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header text-center bg-info">
            <a className="card-link" data-toggle="collapse" href="#collapseFour">
              <h3 className="tittle-w3ls mb-3"><span className="pink">Core Values and Philosophy</span></h3>
            </a>
          </div>
          <div className="collapse" id="collapseFour" data-parent="#accordion">
            <div className="card-body p-md-5">
              <p>Basilwizi will hold on to the following values:</p>
              <div className="container" fluid='true'>
                <ul>
                  <li>
                    <h4>Transparency</h4> 
                    <p>All our work in the organisation shall be open for public scrutiny and done in a clear and responsible manner for all stakeholders to analyse and comprehend. Regular updates to all stakeholders in various forms will drive this value.</p>
                  </li>
                  <br/>
                  <li>
                    <h4>Respect and Equality</h4> 
                    <p>All individuals are equal as human beings and by virtue of the inherent dignity of each human person. All human beings are entitled to their human rights without discrimination of any kind, such as race, colour, sex, ethnicity, age, language, religion, political or other opinion, national or social origin, disability, property, birth or other status as explained by the human rights treaty bodies.</p>
                  </li>
                  <br/>
                  <li>
                    <h4>Accountability and Trustworthy</h4> 
                    <p>States and other duty-bearers are answerable for the observance of human rights. In this regard, they have to comply with the legal norms and standards enshrined in human rights instruments. Where they fail to do so, aggrieved rights-holders are entitled to institute proceedings for appropriate redress of the situation in accordance with the rules and procedures provided by law.</p>
                  </li>
                  <br/>
                  <li>
                    <h4>Empathy</h4> 
                    <p>We shall always put ourselves in the situation of the people of the Zambezi Valley. By so doing, our efforts will serve our community better.</p>
                  </li>
                  <br/>
                  <li>
                    <h4>Sustainable Communities</h4> 
                    <p>Keeping the activity going, investing in individuals and groups to keep initiatives going long term, empowering and leaving skills in communities whilst making and maintaining links to the wider society.</p>
                  </li>
                  <br/>
                  <li>
                    <h4>Team Work and Participation</h4> 
                    <p>Ensuring that everyone has the right to fully participate in the decision-making processes that affect their lives, increasing access to do so by removing barriers and creating opportunities to influence/take part.</p>
                  </li>
                  <br/>
                  <li>
                    <h4>Diligence and Commitmence</h4> 
                    <p>Business-like attitude and a commitment to achieving set goals at least-cost.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header text-center bg-success">
            <a className="card-link" data-toggle="collapse" href="#collapseFive">
              <h3 className="tittle-w3ls mb-3"><span className="pink">Objectives</span></h3>
            </a>
          </div>
          <div className="collapse" id="collapseFive" data-parent="#accordion">
            <div className="card-body p-md-5">
              <h4>To:</h4>
              <div className="container" fluid='true'>
                <ul>
                  <li>empower the affected people to advocate for developmental changes and their inclusion in decision making processes on issues that affect their development particularly the use of resources around / from Lake Kariba;</li>
                  <li>assist the beneficiaries to improve their socio-economic well being, through the establishment of people centred development projects that meet the basic material needs;</li>
                  <li>facilitate the putting in place of legislation, policies, procedures and practices that enhance the capacity of men and women to access, utilise and control their natural resources;</li>
                  <li>promote the cultural and educational development of the beneficiaries;</li>
                  <li>combat and reduce the impact of HIV/AIDS pandemic through community based intervention strategies;</li>
                  <li>promote gender, child protection and disability mainstreaming in all programme activities of the organisation and</li>
                  <li>enhance organisational capacity and ensure effective implementation of Basilwizi goals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header text-center bg-danger">
            <a className="card-link" data-toggle="collapse" href="#collapseSix">
              <h3 className="tittle-w3ls mb-3"><span className="pink">The Mandate</span></h3>
            </a>
          </div>
          <div className="collapse" id="collapseSix" data-parent="#accordion">
            <div className="card-body p-md-5">
              <p className="sub-tittle mt-3 mb-4">Zambezi Valley in general, remain one of the least developed areas in the country, highly vulnerable and chronically food insecure due to external shocks such as drought and crop failure causing annual food shortages, particularly among the poorest and most vulnerable households. Among the underplaying causes of poverty in the Zambezi valley are lack of pro-poor policies and/ or ineffective implementation of exiting policy. Therefore, Basilwizi’s work is still relevant and has potential of accomplishing its mission in light of the current political dispensation in Zimbabwe.</p>
            </div>
          </div>
        </div>
      </div>
      </>
    );
}

export { AboutSection };