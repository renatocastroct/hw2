<html>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>M&H: Intranet CT</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ url('home.css') }}">
    
    <script src="{{ url('home.js') }}" defer></script>

  </head>

  <body>
    <header>
    <div id="overlay">
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
            <a><img src="{{ url('login.png') }}">
                @if(session()->exists("username"))
                  {{ session("name") }}
                @else
                  SignIn
                @endif
            </a>
          </div>
        </h2>        
      </nav>

      <div id="main">

        <div id="sponsor">
            <div id="sponsor_1">
            <h3>Not</h3><h1>Hard</h1><h2>Work</h2>
            </div>
            <div id="sponsor_2">
            <h3>but</h3><h1>Quality</h1><h2>Work</h2>
            </div>
            <h4>is the way to success</h4>
        </div>

        <div id="user" class="off">
          @if(session("username") == null)
            <form name='login'>
              <input type='hidden' name='_token' value='{{$csrf_token}}'>
              <input type='hidden' name='send' value='home'>
              <div>
                <input type='text' name='username' placeholder='username'>
              </div>
              <div>
                <input type='password' name='password' placeholder='password'>
              </div>
              <!-- <div id='check'>
                <input type='checkbox' name='remember' value='1'>
                <label for='remember'>Remember me</label>
              </div> -->
              <div id='submit'>
                <input type='submit' value='Login'>
                <p>New User?</p>
                <a href="{{ url('signup') }}">SignUp</a>
              </div>
            </form>
          @endif
        </div>
      </div>
      
    </div>
    </header>
    @if(session("username") !== null)
      <section id='highlights'>
        <div id='machines'>
          <div id='presentation'>
            <h1>Department Info:</h1>
            <input type='text' id='search' placeholder='Search'>
          </div>
              
          <div class='blocks'> </div>
        </div>
      </section>
    @else
      <section>
        <div class="highlights">
          <img class="highlights" src="{{ url('calendar.jpeg') }}" />
          <div id="comment1"> </div>
        </div>
          
        <div class="highlights">
          <img class="highlights" src="{{ url('results.jpeg') }}" />
          <div id="comment2"> </div>
        </div>          
      </section>
    @endif
      
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