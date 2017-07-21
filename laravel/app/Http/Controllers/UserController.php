<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User as User;
use Mockery\Exception;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']) {
            return response()->json("Error: Credentials did not match", 403);
        }
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

        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']) {
            return response()->json("Error: Credentials did not match", 403);
        }


        $userObject = new User();
        $userObject->username = $request['newUser']['username'];
        $userObject->firstname = $request['newUser']['firstname'];
        $userObject->lastname = $request['newUser']['lastname'];
        $userObject->password = bcrypt($request['newUser']['password']);
        $userObject->email = $request['newUser']['email'];
        $userObject->phone = $request['newUser']['phone'];
        $userObject->phoneCountrycode = $request['newUser']['phoneCountry'];
        $userObject->nickname = $request['newUser']['nickname'];
        $userObject->country = $request['newUser']['country'];
        $userObject->city = $request['newUser']['city'];
        $userObject->street = $request['newUser']['street'];
        $userObject->streetNumber = $request['newUser']['streetNumber'];
        $userObject->postcode = $request['newUser']['postcode'];
        $userObject->discountTotal = $request['newUser']['discount'];
        $userObject->discountDescription = $request['newUser']['discountDescription'];
        $userObject->role_id = 4;

        try {
            $userObject->save();
        } catch (\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1062) {
                return response()->json("Error: Item already exists in the database", 400);
                // houston, we have a duplicate entry problem
            }
        }


        return response()->json([$userObject, $request->all()], 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']) {
            return response()->json("Error: Credentials did not match", 403);
        }

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

        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']) {
            return response()->json("Error: Credentials did not match", 403);
        }

        $user = User::findOrFail($id);

        //TODO: add updated timestamp
        $user->firstname = $request['user']['firstname'];
        $user->lastname = $request['user']['lastname'];
        $user->email = $request['user']['email'];
        $user->phone = $request['user']['phone'];
        $user->phoneCountryCode = $request['user']['phoneCountry'];
        $user->nickname = $request['user']['nickname'];
        $user->country = $request['user']['country'];
        $user->city = $request['user']['city'];
        $user->street = $request['user']['street'];
        $user->streetNumber = $request['user']['streetNumber'];
        $user->postcode = $request['user']['postcode'];
        $user->discountTotal = $request['user']['discount'];
        $user->discountDescription = $request['user']['discountDescription'];
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
        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']) {
            return response()->json("Error: Credentials did not match", 403);
        }

        $user = User::findOrFail($id);

//        var_dump($request);

        $data = $request->all();
        $user->password = bcrypt($request['password']['password']);
        $user->update();


        return response()->json([$user, $request['password'], $data], 200);
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
