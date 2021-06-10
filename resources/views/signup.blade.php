<html>

  <div class="off">
    <div>
        <h2>You're IN!</h2>
        <div id="confirmButtons">
          <input type="button" value="Thx">
        </div>
    </div>      
  </div>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>M&H: Intranet CT</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ url('signup.css') }}">
    <script src="{{ url('signup.js') }}" defer></script>

  </head>

  <body>
    <header>

      <div id="title">
        <h1>M&H</h1>
        <h2>Microelectronics</h2>
        <h3>Intranet CT</h3>
      </div>

      <nav id="links">
        <h2>
          <a href='{{ url("home") }}'><img src="{{ url('home.png') }}">Home</a>
          <a href='{{ url("statistics") }}'><img src="{{ url('statistics.png') }}">Statistics</a>
          <a href='{{ url("production") }}'><img src="{{ url('prod.png') }}">Production</a>
          <a><img src="{{ url('cards.png') }}">Employees</a>
          <a><img src="{{ url('tips.png') }}">Tips</a>
          <div id="login">
            <a><img src="{{ url('login.png') }}">SignIn</a>
          </div>
        </h2>
      </nav>
    
    </header>

    <section>
    <div id="user" class="off">
      <form name='login' method='POST' action="{{ url('signup/user') }}">
        <input type='hidden' name='_token' value='{{$csrf_token}}'>
        <input type='hidden' name='send' value='home'>
        <div>
          <input type='text' name='username' placeholder='username'>
        </div>
        <div>
          <input type='password' name='password' placeholder='password'>
        </div>
  <!--  <div id='check'>
          <input type='checkbox' name='remember' value='1'>
          <label for='remember'>Remember me</label>
        </div> -->
          <div id='submit'>
            <input type='submit' value='Login'>
            <p>New User?</p>
            <a href='{{ url("signup") }}'>SignUp</a>
          </div>
      </form>
    </div>

            <div id="menu">
                <h3>Registration</h3>
                <div>
                  <p>Join our community:<br>
                      - Run whit us<br>
                      - Participate to M&H Events<br>
                      - Stay informed with M&H eNews<br>
                      - Get help with M&H Support<br>
                      - Discuss on the M&H Community<br>
                      - Download Software<br>
                      - Manage your product updates<br>
                      - Buy M&H Products & Tools<br>
                  </p>
                </div>
            </div>
            <div class="info">
                <div>
                    <h1>my.m&h account creation</h1>
                </div>
              <form name='registration'>
                <div>
                  <div>
                      <h2>First name: </h2>
                      <h2>Last name:</h2>
                      <h2>Department: </h2>
                      <h2>Gender: </h2>
                      <h2>Password: </h2>
                      <h2>Password confirmation: </h2>

                  </div>
                  <div>
                      <input type='text' name='firstName'>
                      <input type='text' name='lastName'>
                      <select name='department'>
                          <option value='' selected='selected' hidden></option>                          
                          <option value='1'>Forni</option>
                          <option value='2'>Cappe</option>
                          <option value='4'>Impiantatori</option>
                          <option value='3'>PVD</option>
                          <option value='5'>Lithografici</option>
                      </select>
                      <select name='gender'>
                          <option class ='choice' value='' selected='selected' hidden></option>
                          <option value='Donna'>Female</option>
                          <option value='Uomo'>Male</option>
                          <option value='Privato'>Private</option>
                      </select>
                      <input type='password' name='password' placeholder="Letters, numbers and underscore">
                      <input type='password' name='passwordConfirm'>
                  </div>  
                </div>
                <div class="check">
                    <input type='checkbox' name='policy' value="1">
                    <h2>I have read and understood the <a>Terms of Use</a> and <a>Privacy Policy</a></h2>
                </div>
                <!-- <div class="check">
                    <input type='checkbox' name='news' value="1">
                    <h2>I want to stay informed about M&H's latest news</h2>
                </div> -->
                <div>
                    <input type='submit' value="Register">
                </div>
              </form>

            </div>
            

    </section>

    <footer>
        <p>
          <h1>Design by Renato Castro - 1000011358</h1>
          <a><img src="{{ url('twitter.png') }}"></a>
          <a><img src="{{ url('fb.png') }}"></a>
          <a><img src="{{ url('ig.png') }}"></a>
          <a><img src="{{ url('pinterest.png') }}"></a>
          <address>Viale Mario Rapisardi, 140/144 - 95125 Catania (CT)</address>
        </p>
    </footer>
  </body>
</html>