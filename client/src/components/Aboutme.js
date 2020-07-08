import React, { Fragment } from 'react';

const Aboutme = () => {
  return (
    <Fragment>
      <div className='section main-wrap'>
        <div className='sidebar'>
          <h1>Skills</h1>
          <div className='skill'>
            <h3 style={{ margin: '10px 5px' }}>
              React <i class='fab fa-react'></i>
            </h3>
            <div className='progress' style={{ height: '40px' }}>
              <div
                className='progress-bar'
                style={{ width: '70%', height: '40px' }}
              >
                70%
              </div>
            </div>
          </div>
          <div className='skill'>
            <h3 style={{ margin: '10px 5px' }}>
              Vue <i class='fab fa-vuejs'></i>
            </h3>
            <div className='progress' style={{ height: '40px' }}>
              <div
                className='progress-bar'
                style={{ width: '20%', height: '40px' }}
              >
                20%
              </div>
            </div>
          </div>
          <div className='skill'>
            <h3 style={{ margin: '10px 5px' }}>
              HTML <i class='fab fa-html5'></i>
            </h3>
            <div className='progress' style={{ height: '40px' }}>
              <div
                className='progress-bar'
                style={{ width: '100%', height: '40px' }}
              >
                100%
              </div>
            </div>
          </div>
          <div className='skill'>
            <h3 style={{ margin: '10px 5px' }}>
              CSS <i class='fab fa-css3-alt'></i>
            </h3>
            <div className='progress' style={{ height: '40px' }}>
              <div
                className='progress-bar'
                style={{ width: '60%', height: '40px' }}
              >
                60%
              </div>
            </div>
          </div>
          <div className='skill'>
            <h3 style={{ margin: '10px 5px' }}>
              JavaScript <i class='fab fa-js'></i>
            </h3>
            <div className='progress' style={{ height: '40px' }}>
              <div
                className='progress-bar'
                style={{ width: '80%', height: '40px' }}
              >
                80%
              </div>
            </div>
          </div>
          <div className='skill'>
            <h3 style={{ margin: '10px 5px' }}>
              Python <i class='fab fa-python'></i>
            </h3>
            <div className='progress' style={{ height: '40px' }}>
              <div
                className='progress-bar'
                style={{ width: '80%', height: '40px' }}
              >
                80%
              </div>
            </div>
          </div>
          <div className='skill'>
            <h3 style={{ margin: '10px 5px' }}>
              Node <i class='fab fa-node'></i>
            </h3>
            <div className='progress' style={{ height: '40px' }}>
              <div
                className='progress-bar'
                style={{ width: '80%', height: '40px' }}
              >
                80%
              </div>
            </div>
          </div>
        </div>
        <div className='main-desc'>
          <div className='description'>
            <h1>Προφίλ</h1>
            <div className=' sort-desc'>
              <p style={{ fontSize: '20px' }}>
                Είμαι ένας ενθουσιώδης Junior Full-Stack developer ο οποίος έχει
                τεράστια όρεξη για εργασία πάνω στον τομέα του προγραμματισμού
                και πιο συγκεκριμένα στο Web Development. Δίνω έμφαση στην
                λεπτομέρια και προσέχω πάντα ο κώδικάς μου να είναι ευανάγνωστος
                καθώς έχω πάντα ομαδίκο πνεύμα
              </p>
            </div>

            <h1>Εκπαίδευση</h1>
            <div className=' sort-desc' style={{ fontSize: '20px' }}>
              <h5>Απολύτηριο Λύκειου , 2ο Γ.Ε.Λ. Ηγουμενίτσας</h5>
              <span>Ιούλιος 2015</span>
              <h5>
                Software Engineer , Μηχανικών Πληροφορικής (Τ.Ε.Ι. Στερεάς
                Ελλάδας)
              </h5>
              <span>Σεπτέμβριος 2015 - Ιούλιος 2020</span>
            </div>
            <h1>Projects</h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <div
                className='card'
                style={{
                  width: '18rem',
                  marginRight: '10px',
                  marginBottom: '20px',
                }}
              >
                <img
                  className='card-img-top'
                  src='https://my-bio-8729a.web.app/Screenshot%20(16).png'
                  alt='Card image cap'
                />
                <div className='card-body'>
                  <h5 className='card-title'>DevBook</h5>
                  <p className='card-text'>
                    Ένα social platform για developers <br />
                    Τεχνολογίες που χρησιμοποιήθηκαν : MongoDB , React(frontend)
                    , Node/Express(Backend) , Redux , JWToken(Auth)
                  </p>
                  <a
                    href='https://salty-river-39034.herokuapp.com/'
                    className='btn btn-primary'
                  >
                    Go to site
                  </a>
                </div>
              </div>
              <div
                className='card'
                style={{
                  width: '18rem',
                  marginRight: '10px',
                  marginBottom: '20px',
                }}
              >
                <img
                  className='card-img-top'
                  src='https://my-bio-8729a.web.app/Screenshot%20(18).png'
                  alt='Card image cap'
                />
                <div className='card-body'>
                  <h5 className='card-title'>Tommy on the Go</h5>
                  <p className='card-text'>
                    Ένα μικρό platform game σε Python <br />
                    Τεχνολογίες που χρησιμοποιήθηκαν : Python, Pygame(lib)
                  </p>
                  <a
                    href='https://github.com/giorgos321/a_small_platform_game'
                    className='btn btn-primary'
                  >
                    Go to site
                  </a>
                </div>
              </div>
              <div
                className='card'
                style={{
                  width: '18rem',
                  marginRight: '10px',
                  marginBottom: '20px',
                }}
              >
                <img
                  className='card-img-top'
                  src='https://my-bio-8729a.web.app/Screenshot%20(21).png'
                  alt='Card image cap'
                />
                <div className='card-body'>
                  <h5 className='card-title'>My Blog-Portfolio</h5>
                  <p className='card-text'>
                    Το προσωπικό μου blog-portfolio{' '}
                    <span style={{ fontweight: 'bold' }}>
                      (Work in progress)
                    </span>
                    <br />
                    Τεχνολογίες που χρησιμοποιήθηκαν :
                    React,Node/Express,Redux,PassportJs(Auth)
                  </p>
                </div>
              </div>
              *Ολα τα projects υπάρχουν στο Github
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Aboutme;
