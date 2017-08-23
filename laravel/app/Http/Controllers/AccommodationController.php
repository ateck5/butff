<?php

namespace App\Http\Controllers;

use App\Accommodation;
use App\User;
use Illuminate\Http\Request;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $accommodations = Accommodation::with('users')->get();
        return response()->json($accommodations, 200);
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
        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']) {
            return response()->json("Error: Credentials did not match", 403);
        }

        $accommodationObject = new Accommodation();
        $accommodationObject->name = $request['newAccommodation']['name'];
        $accommodationObject->email = $request['newAccommodation']['email'];
        $accommodationObject->country = $request['newAccommodation']['country'];
        $accommodationObject->city = $request['newAccommodation']['city'];
        $accommodationObject->street = $request['newAccommodation']['street'];
        $accommodationObject->streetNumber = $request['newAccommodation']['streetNumber'];
        $accommodationObject->postcode = $request['newAccommodation']['postcode'];
        $accommodationObject->phone = $request['newAccommodation']['phone'];
        $accommodationObject->phoneCountryCode = $request['newAccommodation']['phoneCountrycode'];
        $accommodationObject->maxRooms = $request['newAccommodation']['maxRooms'];
        $accommodationObject->description = $request['newAccommodation']['description'];

        try {
            $accommodationObject->save();
        } catch (\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1062) {
                return response()->json("Error: Item already exists in the database", 400);
                // houston, we have a duplicate entry problem
            }
            return response()->json(["Something went wrong", $e, $request->all()], 503);
        }


        return response()->json([$accommodationObject, $request->all()], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $accommodation = Accommodation::findOrFail($id);

        return response()->json($accommodation, 200);
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
        $accommodation = Accommodation::findOrFail($id);
//        return response()->json($accommodation, 200);

        $accommodation->name = $request['accommodation']['name'];
        $accommodation->email = $request['accommodation']['email'];
        $accommodation->country = $request['accommodation']['country'];
        $accommodation->city = $request['accommodation']['city'];
        $accommodation->street = $request['accommodation']['street'];
        $accommodation->streetNumber = $request['accommodation']['streetNumber'];
        $accommodation->postcode = $request['accommodation']['postcode'];
        $accommodation->phone = $request['accommodation']['phone'];
        $accommodation->phoneCountrycode = $request['accommodation']['phoneCountrycode'];
        $accommodation->maxRooms = $request['accommodation']['maxRooms'];
        $accommodation->description = $request['accommodation']['description'];

        $accommodation->update();

        return response()->json($accommodation, 200);
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
