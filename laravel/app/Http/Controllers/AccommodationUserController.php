<?php

namespace App\Http\Controllers;

use App\AccommodationsUsers;
use App\User;
use Illuminate\Http\Request;

class AccommodationUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $accommodationsUsers[] = AccommodationsUsers::all();

        return response()->json($accommodationsUsers, 200);
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource based on user_id.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $accommodationsUser = AccommodationsUsers::where('user_id', $id)->get();

        return response()->json($accommodationsUser, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']) {
            return response()->json("Error: Credentials did not match", 403);
        }
        $accommodationUser = AccommodationsUsers::findOrFail($id);

        //TODO: add updated timestamp

        //TODO: fix datetime format
        $accommodationUser->price = number_format(floatval($request['accommodation']['price']), 2, '.', '');
        $accommodationUser->dateArrival = $request['accommodation']['dateArrival'];
        $accommodationUser->dateDepartment = $request['accommodation']['dateDepartment'];

        $accommodationUser->update();

        return response()->json($accommodationUser, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
