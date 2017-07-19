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

        return response()->json($users, 200);
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
    public function store(Request $request)
    {
//        return response()->json("store", 200);
//        return response()->json($user, 200);

        $userObject = new User();
        $userObject->username = $request['username'];
        $userObject->firstname = $request['firstname'];
        $userObject->lastname = $request['lastname'];
        $userObject->password = bcrypt($request['password']);
        $userObject->email = $request['email'];
        $userObject->phone = $request['phone'];
        $userObject->phoneCountrycode = $request['phoneCountry'];
        $userObject->nickname = $request['nickname'];
        $userObject->country = $request['country'];
        $userObject->city = $request['city'];
        $userObject->street = $request['street'];
        $userObject->streetNumber = $request['streetNumber'];
        $userObject->postcode = $request['postcode'];
        $userObject->discountTotal = $request['discount'];
        $userObject->discountDescription = $request['discountDescription'];
        $userObject->role_id = 4;

        $userObject->save();

        return response()->json([$userObject, $request->all()], 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json($user, 200);
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

        $data = $request->all();
        //TODO: add updated timestamp

        $user->firstname = $data['firstname'];
        $user->lastname = $data['lastname'];
        $user->email = $data['email'];
        $user->phone = $data['phone'];
        $user->phoneCountryCode = $data['phoneCountry'];
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
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function changePassword(Request $request, $id)
    {
        $user = User::findOrFail($id);

//        var_dump($request);

        $data = $request->all();
        $user->password = bcrypt($request['password']);
//        $user->update();


        return response()->json([$user, $request, $data], 200);
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
