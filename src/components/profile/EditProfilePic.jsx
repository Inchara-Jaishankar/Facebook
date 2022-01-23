import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Input, Divider, Box, Heading, Image, Flex, Spacer, VStack, useToast, } from '@chakra-ui/react'
import { RiEdit2Fill } from 'react-icons/ri';
import { loadData } from '../../utils/localstore';
import { useEffect, useRef } from "react"


export const EditProfilePic = ({ m, w, title, pic, setPic }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { _id } = loadData("user");

    const displayToast = useToast();
    const toast = (title, description, status) => displayToast({ title, description, status, position: 'top', duration: 7000, isClosable: true, });


    const profile = useRef()

    useEffect(() => {

        fetch(`http://localhost:1234/profpic/${_id}`)
            .then(d => d.json())
            .then((res) => {
                setPic(res.img)
                console.log("Response:", res.img)
            })
            .catch(err => { console.log(err) })

    }, [profile])



    const uploadProfilePic = (e) => {
        e.preventDefault();

        fetch(`http://localhost:1234/profpic/${_id}`, {
            method: 'DELETE',
        })
            .then(d => d.json())
            .then((res) => {
                console.log("item delted ", res)
            })
            .catch(err => { console.log(err) })


        var formData = new FormData();
        console.log(profile, "mai he hu bta")
        formData.append('user_id', _id)
        formData.append('mypic', profile.current.files[0])

        console.log(profile.current.files[0], "cat")

        for (var data of formData.entries()) { console.log(data, "i am for loop") }

        fetch(`http://localhost:1234/profpic/${_id}`, {
            method: 'POST',
            body: formData
        })
            .then(d => d.json())
            .then((res) => {
                console.log("Response:", res, " I am response", formData)
            })
            .catch(err => { console.log(err) })
    }


    return (
        <>
            <Button leftIcon={<RiEdit2Fill />} m={m} w={w} onClick={onOpen}>{title}</Button>

            <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight={700} textAlign={'center'}>Edit Profile</ModalHeader>
                    <Divider />
                    <ModalCloseButton />
                    <ModalBody >

                        <Box m={'10px'}>
                            <form onSubmit={uploadProfilePic}>
                                <Flex>
                                    <Heading fontSize={20}>Profile Pic</Heading>
                                    <Spacer />
                                    <input ref={profile} type='file' accept="image/png, image/jpeg" name='mypic' />
                                    <Spacer />
                                    <Button type='submit' >Add</Button>
                                </Flex>
                            </form>
                            <Flex justify={'center'} m={4}>
                                <Box w={'160px'} h={'160px'} overflow={'hidden'} rounded={'full'}>
                                    <Image src={`uploadImgs/${pic}`} />
                                </Box>
                            </Flex>
                        </Box>

                        <Divider />

                        <Box m={'20px'}>
                            <Flex>
                                <Heading fontSize={20}>Cover Photo</Heading>
                                <Spacer />
                                <input id='profilePic' type='file' accept="image/png, image/jpeg" />
                                <Spacer />
                                <Button>Add</Button>
                            </Flex>
                            <Flex justify={'center'} m={4}>
                                <Box w={'330px'} h={'100px'} overflow={'hidden'} rounded={4}>
                                    <Image w={'100%'} src="https://via.placeholder.com/200" />
                                </Box>
                            </Flex>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

