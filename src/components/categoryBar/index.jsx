import './styles.css'
export default function CategoryBar(){
  return <div className="cat-bar-div">
    <a className='loan-btn' href="/">Loan</a>
    <a className='rd-btn' href="/rd">RD</a>
    <a className='fd-btn' href="/fd">FD</a>
  </div>
}