<html>

    <div class="off">
        <div>
            <h2></h2>
            <div id="confirmButtons" class="off">
                <input type="button" value="Yes">
                <input type="button" value="No">
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
    <link rel="stylesheet" href="{{ url('production.css') }}">
    <script src="{{ url('production.js') }}" defer></script>

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
                <a href='{{ url("home") }}'><img src='{{ url("home.png") }}'>Home</a>
                <a href='{{ url("statistics") }}'><img src='{{ url("statistics.png") }}'>Statistics</a>
                <a href='{{ url("production") }}'><img src='{{ url("prod.png") }}'>Production</a>
                <a><img src='{{ url("cards.png") }}'>Employees</a>
                <a><img src='{{ url("tips.png") }}'>Tips</a>
                <div id="login">
                    <a><img src='{{ url("login.png") }}'>
                        @if(session("username") !== null)
                            {{ session("name") }}
                        @else
                            SignIn
                        @endif
                    </a>
                </div>
              </h2>
          
        </nav>  

    </header>

    <section>
        <div id="user" class="off">
            @if(session("username") == null)
                <form name='login' method='POST' action="{{ url('user') }}">
                    <input type='hidden' name='_token' value='{{$csrf_token}}'>
                    <input type='hidden' name='send' value='production'>
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
                        <a href='{{ url("signup") }}'>SignUp</a>
                    </div>
                </form>
            @endif
        </div>
        <div id="menu">
            <h3>Production</h3>
            <div>
                <a>Last Results</a>
                <a>Manage Machines</a>
                <a>Manage Lots</a>
                <a>Week News</a>
            </div>
        </div>

        <div class="manage">
            <div id="title_window">
                @if (isset($send))
                    <h1>{{$send}}</h1>
                @endif
            </div>
            @if (!empty(session("username")))
                <div class='off'>
                    <h2>Search</h2>
                    <h2>Create</h2>
                    <h2>Locate</h2>
                </div>

                <form name='search' class='off'>
                    <div>
                        <div>
                            <label for='lot'>Lot ID</label>
                            <input type='text' name='lot' value=''>
                        </div>
                        <div>
                            <label for='product'>Product</label>
                            <select name='product'>
                                <option class ='choice' value='' selected='selected' hidden></option>
                                <option value='rfsl'>RFSL</option>
                                <option value='mrgl'>MRGL</option>
                                <option value='ssll'>SSLL</option>
                                <option value='euio'>EUIO</option>
                            </select>
                        </div>
                        <div>
                            <label for='flag'>Flag</label>
                            <select name='flag'>
                                <option class ='choice' value='' selected='selected' hidden></option>
                                <option value='7'>7</option>
                                <option value='d'>D</option>
                            </select>
                        </div>    
                        <input type='submit' value='Search'> 
                        <input type='button' name='clear' value='Clear'> 
                    </div>
                </form>

                <form name='create' class='off'>
                    <div>
                        <div>
                            <label for='lot'>Lot ID</label>
                            <input type='text' name='lot' value=''>
                        </div>
                        <div>
                            <label for='product'>Product</label>
                            <select name='product'>
                                <option class ='choice' value='' selected='selected' hidden></option>
                                <option value='rfsl'>RFSL</option>
                                <option value='mrgl'>MRGL</option>
                                <option value='ssll'>SSLL</option>
                                <option value='euio'>EUIO</option>
                            </select>
                        </div>
                        <div>
                                <label for='n_wfs'>N° WFS</label>
                                <input type='number' name='n_wfs' min='1' max='24'>
                            </div>
                                
                        <input type='submit' value='Confirm'>
                        <input type='button' name='clear' value='Clear'> 
                    </div>
                </form>

                <h3 class='off'></h3>

                <table class='off'>
                    <thead>
                        <tr>
                            <td>Series</td>
                            <td>Product</td>
                            <td>Quantity</td>
                            <td>Flag</td>
                            <td>Drop</td>
                        </tr>
                    </thead>
                    <tbody> </tbody>
                </table>
            @endif
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