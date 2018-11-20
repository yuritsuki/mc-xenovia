@extends('layouts.app')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-md-12 col-md-offset-2">
                <h1>{{ $exception->getMessage() }}</h1>
                <p>Вернуться <a href="{{ url()->previous() }}">назад</a></p>
            </div>
        </div>
    </div>


@endsection