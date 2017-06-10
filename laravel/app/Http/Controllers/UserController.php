<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User as User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users[] = User::all();
//        dd('something');

        return response()->json($users, 200);
//        return $user;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user[] = User::findOrFail($id);

        return response()->json($user, 200);
//        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

//        var_dump($request->get('firstname'));
        $data = $request->all();
//        var_dump($data);

        $user->firstname = $data['firstname'];
        $user->lastname = $data['lastname'];
        $user->email = $data['email'];
        $user->phone = $data['phone'];
        $user->phoneCountryCode = $data['phoneCountrycode'];
        $user->nickname = $data['nickname'];
        $user->country = $data['country'];
        $user->city = $data['city'];
        $user->street = $data['street'];
        $user->streetNumber = $data['streetNumber'];
        $user->postcode = $data['postcode'];
        $user->update();

        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
