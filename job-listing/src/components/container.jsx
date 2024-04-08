import photosnap from '../images/photosnap.svg'
import manage from '../images/manage.svg'
import account from '../images/account.svg'
import myhome from '../images/myhome.svg'
import loop from '../images/loop-studios.svg'
import faceit from '../images/faceit.svg'
import shortly from '../images/shortly.svg'
import insure from '../images/insure.svg'
import eyecam from '../images/eyecam-co.svg'
import air from '../images/the-air-filter-company.svg'
export default function Container(props){
    function showing(e){
        props.show(e)
    }
    const logos = {
        "Photosnap" : photosnap,
        "Manage" : manage,
        "Account" :account,
        "MyHome" : myhome,
        "Loop Studios" : loop,
        "FaceIt" : faceit,
        "Shortly" : shortly,
        "Insure" :insure,
        "Eyecam Co." : eyecam,
        "The Air Filter Company" : air
    }

    const logoSrc = logos[props.company];

    return( 
    <div className='container'>
    <div className={props.box}>
      <div className='flex'>
        <div className='roundImage'><img src= {logoSrc}/></div>
        <div className="text">

          
            <span className='name'>{props.company}</span>
            {props.new && <span className="new">{props.new}!</span>}
            {props.featured && <span className="featured">{props.featured}</span>}
            
          <h4>{props.position}</h4>
          <div className="flex"> <span className="date">{props.postedAt}</span><span className="dot">.</span><span className="date">{props.contract}</span><span className="dot">.</span><span className="date">{props.location}</span></div>
        </div>
        </div>
    <div className='properties'>
        <div onClick={showing}>{props.role}</div>
        <div onClick={showing}>{props.level}</div>
        {props.languages.map((language, index) => (
        <div key={index} onClick={showing}>{language}</div>
      ))}
      {props.tools && props.tools.length > 0 && ( // Check if props.tools is defined and not empty
        <div>{props.tools}</div>
    )}
    </div>
    </div>
  </div>
  )
}